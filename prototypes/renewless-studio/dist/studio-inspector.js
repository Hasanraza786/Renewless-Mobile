'use strict';
/* Studio-only inspection. No backend upload, saved edits or product-screen controls. */
(()=>{
 const comparison=document.getElementById('comparison');
 const panel=document.createElement('section');panel.className='studio-inspector';panel.hidden=true;panel.setAttribute('aria-label','Design inspector');
 panel.innerHTML='<header><h2>Inspect</h2><button type="button" data-inspector-close aria-label="Close inspector">×</button></header><div id="inspector-details"><p>Double-click text or an icon in the phone.</p></div>';
 const outline=document.createElement('div');outline.className='studio-selection';outline.hidden=true;outline.setAttribute('aria-hidden','true');
 document.body.append(panel,outline);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='studio-inspector-toggle';toggle.textContent='Inspect';toggle.setAttribute('aria-pressed','false');toggle.title='Inspect mode: pause phone actions, then double-click text or icons';document.querySelector('.tools').prepend(toggle);
 const hint=document.createElement('p');hint.className='studio-inspector-hint';hint.textContent='Double-click text or icons to inspect · Inspect mode pauses phone actions';document.getElementById('context').after(hint);
 const details=panel.querySelector('#inspector-details');
 let selected=null,preview_url=null,asset=null,inspect_mode=false,pending_click=null,replaying=false,selection_revision=0;
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const row=(label,value)=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
 function applyTypography(){
  const candidates=[...comparison.querySelectorAll('.phone *:not([data-studio-type])')].filter(el=>{
   if(el.closest('svg,.status,.homebar')||!['http://www.w3.org/1999/xhtml',null].includes(el.namespaceURI))return false;
   const text=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('');
   return /[\p{L}\p{N}]/u.test(text)||el.matches('input:not([type="checkbox"]):not([type="radio"]),textarea,select,h1,h2,h3,h4');
  });
  // Snapshot before assigning roles so inherited sizes do not change classification mid-pass.
  const roles=candidates.map(el=>{const size=parseFloat(getComputedStyle(el).fontSize);return [el,el.matches('h1,h2')?'heading':el.matches('h3,h4,.row .body>strong,.spend-label>strong,.spend-heading>strong')?'subheading':el.matches('button,a,input,textarea,select,label')?'body':size>=20?'heading':size>=15?'subheading':'body'];});
  roles.forEach(([el,role])=>{el.dataset.studioType=role;});
 }
 function updateOutline(){if(!selected?.isConnected){outline.hidden=true;return;}const r=selected.getBoundingClientRect();Object.assign(outline.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});outline.hidden=false;}
 function clearAsset(){if(preview_url)URL.revokeObjectURL(preview_url);preview_url=null;asset=null;}
 function close(){selection_revision++;clearAsset();selected=null;outline.hidden=true;panel.hidden=true;document.body.classList.remove('studio-inspecting');toggle.focus();}
 function show(el){selection_revision++;clearAsset();selected=el;panel.hidden=false;document.body.classList.add('studio-inspecting');requestAnimationFrame(updateOutline);return selection_revision;}
 function textTarget(target){let el=target.closest('input,textarea,select')||target;while(el&&!el.matches('.phone')){if(el.matches('input,textarea,select')||/[\p{L}\p{N}]/u.test([...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('')))return el;el=el.parentElement;}return null;}
 function inspectText(el){
  applyTypography();show(el);const s=getComputedStyle(el),r=el.getBoundingClientRect();
  const text=el.matches('input[type="password"]')?'Password field':el.matches('input,textarea')?(el.value||el.placeholder):el.matches('select')?el.selectedOptions[0]?.textContent:el.textContent.trim();
  details.innerHTML=`<h3>TEXT</h3><blockquote>${esc(text||'Empty field')}</blockquote><h3>Typography</h3><dl>${row('Role',el.dataset.studioType||'Inherited')}${row('Font family',s.fontFamily)}${row('Font size',s.fontSize)}${row('Weight',s.fontWeight)}${row('Line height',s.lineHeight)}${row('Letter spacing',s.letterSpacing)}${row('Align',s.textAlign)}${row('Color',s.color)}${row('Opacity',s.opacity)}${row('Background',s.backgroundColor)}</dl><h3>Layout</h3><dl>${row('Width × height',`${r.width.toFixed(1)} × ${r.height.toFixed(1)} px`)}${row('Padding',s.padding)}${row('Margin',s.margin)}</dl><div class="inspector-actions"><button type="button" data-inspector-copy>Copy CSS</button></div><p class="inspector-note">Computed browser values. Font family shows the CSS stack. Inspection is read-only; the shared typography scale is 22 / 16 / 12.</p><p role="status" id="inspector-status"></p>`;
 }
 function inlineSvg(el){
  const clone=el.cloneNode(true),original=[el,...el.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
  original.forEach((node,i)=>{const s=getComputedStyle(node);for(const prop of ['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','opacity','fill-opacity','stroke-opacity','color','font-family','font-size'])copies[i].style.setProperty(prop,s.getPropertyValue(prop));});
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');return clone;
 }
 function cleanSvg(svg,width,height){
  svg.querySelectorAll('script,foreignObject').forEach(n=>n.remove());
  for(const node of [svg,...svg.querySelectorAll('*')])for(const a of [...node.attributes])if(/^on/i.test(a.name))node.removeAttribute(a.name);
  if(!svg.getAttribute('viewBox'))svg.setAttribute('viewBox',`0 0 ${parseFloat(svg.getAttribute('width'))||width} ${parseFloat(svg.getAttribute('height'))||height}`);
  svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width',String(width));svg.setAttribute('height',String(height));
  return new XMLSerializer().serializeToString(svg);
 }
 async function inspectAsset(el){
  const revision=show(el),r=el.getBoundingClientRect();const width=Math.max(1,el.clientWidth||r.width),height=Math.max(1,el.clientHeight||r.height);
  details.innerHTML='<h3>ASSET</h3><p role="status">Loading preview…</p>';
  try{
   let blob,vector=false,label=el.getAttribute('alt')||el.getAttribute('aria-label')||el.closest('button')?.getAttribute('aria-label')||'Icon';
   if(el.tagName.toLowerCase()==='svg'){blob=new Blob([cleanSvg(inlineSvg(el),width,height)],{type:'image/svg+xml'});vector=true;}
   else if(el.tagName.toLowerCase()==='canvas'){blob=await new Promise(resolve=>el.toBlob(resolve,'image/png'));}
   else{
    const response=await fetch(el.currentSrc||el.src);if(!response.ok)throw new Error('This asset could not be loaded.');blob=await response.blob();
    if(blob.type.includes('svg')||/\.svg(?:[?#]|$)/i.test(el.currentSrc||el.src)){const parsed=new DOMParser().parseFromString(await blob.text(),'image/svg+xml');if(parsed.querySelector('parsererror')||parsed.documentElement.localName!=='svg')throw new Error('The SVG is invalid.');blob=new Blob([cleanSvg(parsed.documentElement,width,height)],{type:'image/svg+xml'});vector=true;}
   }
   if(revision!==selection_revision)return;if(!blob)throw new Error('Image export is unavailable.');
   asset={blob,vector,width,height,name:label.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'renewless-icon'};
   preview_url=URL.createObjectURL(blob);
   details.innerHTML=`<h3>${vector?'VECTOR ICON':'IMAGE'}</h3><div class="inspector-preview"><img src="${esc(preview_url)}" alt="${esc(label)} preview"></div><dl>${row('Name',label)}${row('Format',vector?'SVG':blob.type||'Image')}${row('Rendered size',`${width.toFixed(1)} × ${height.toFixed(1)} px`)}</dl><h3>Export</h3><label>PNG scale <select data-inspector-scale aria-label="PNG export scale"><option value="1">1×</option><option value="2" selected>2×</option><option value="4">4×</option></select></label><div class="inspector-actions"><button type="button" data-inspector-download="svg" ${vector?'':'disabled'}>SVG</button><button type="button" data-inspector-download="png">PNG</button></div><p class="inspector-note">${vector?'SVG keeps vector paths and resolved icon colors. PNG uses a transparent canvas.':'Raster images export as PNG. An SVG download requires original vector artwork.'}</p><p role="status" id="inspector-status"></p>`;
  }catch(error){if(revision===selection_revision)details.innerHTML=`<h3>ASSET</h3><p role="status">${esc(error.message)}</p>`;}
 }
 function save(blob,name){const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 async function download(format){
  const current=asset;if(!current)return;
  const status=details.querySelector('#inspector-status');
  try{if(format==='svg'){if(current.vector)save(current.blob,current.name+'.svg');return;}
   const scale=Number(details.querySelector('[data-inspector-scale]').value),image=new Image(),url=URL.createObjectURL(current.blob);
   try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('This image cannot be rendered as PNG.'));image.src=url;});
    const canvas=document.createElement('canvas'),ratio=Math.min(scale,4096/Math.max(current.width,current.height));canvas.width=Math.max(1,Math.round(current.width*ratio));canvas.height=Math.max(1,Math.round(current.height*ratio));const ctx=canvas.getContext('2d');if(!ctx)throw new Error('PNG export is unavailable.');ctx.drawImage(image,0,0,canvas.width,canvas.height);const png=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!png)throw new Error('PNG export failed.');save(png,current.name+`@${scale}x.png`);
   }finally{URL.revokeObjectURL(url);}
  }catch(error){if(status)status.textContent=error.message;}
 }
 toggle.addEventListener('click',()=>{inspect_mode=!inspect_mode;toggle.setAttribute('aria-pressed',String(inspect_mode));toggle.textContent=inspect_mode?'Inspecting':'Inspect';});
 panel.addEventListener('click',async e=>{
  if(e.target.closest('[data-inspector-close]'))close();
  if(e.target.closest('[data-inspector-download]'))download(e.target.closest('[data-inspector-download]').dataset.inspectorDownload);
  if(e.target.closest('[data-inspector-copy]')&&selected){const s=getComputedStyle(selected),text=['font-family','font-size','font-weight','line-height','letter-spacing','color','text-align'].map(p=>`${p}: ${s.getPropertyValue(p)};`).join('\n');try{await navigator.clipboard.writeText(text);details.querySelector('#inspector-status').textContent='CSS copied.';}catch{details.querySelector('#inspector-status').textContent='Clipboard unavailable in this browser.';}}
 });
 document.addEventListener('click',e=>{
  if(replaying||!e.target.closest('.phone'))return;
  if(inspect_mode){e.preventDefault();e.stopImmediatePropagation();return;}
  if(e.detail===0)return;
  const target=e.target.closest('button,a,[data-go],[data-action]');if(!target)return;
  e.preventDefault();e.stopImmediatePropagation();clearTimeout(pending_click);
  if(e.detail>1)return;
  pending_click=setTimeout(()=>{if(target.isConnected){replaying=true;try{target.click();}finally{replaying=false;}}},300);
 },true);
 document.addEventListener('dblclick',e=>{
  if(!e.target.closest('.phone'))return;e.preventDefault();e.stopImmediatePropagation();clearTimeout(pending_click);
  const media=e.target.closest('svg,img,canvas');if(media)inspectAsset(media);else{const text=textTarget(e.target);if(text)inspectText(text);}
 },true);
 document.addEventListener('pointerdown',e=>{if(inspect_mode&&e.target.closest('.phone'))e.stopImmediatePropagation();},true);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();e.stopImmediatePropagation();close();}},true);
 window.addEventListener('resize',updateOutline);document.addEventListener('scroll',updateOutline,true);
 new MutationObserver(()=>{applyTypography();if(selected&&!selected.isConnected){selection_revision++;clearAsset();selected=null;outline.hidden=true;details.innerHTML='<p>Screen changed. Double-click another element to inspect.</p>';}}).observe(comparison,{childList:true,subtree:true,characterData:true});
 applyTypography();
})();
