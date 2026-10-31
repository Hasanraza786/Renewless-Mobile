/* Shared informational popover. Content is plain text, escaped before rendering. */
let infoTooltipSequence=0;
function infoTooltip({id,label,paragraphs,className=''}) {
 id=id+'-'+(++infoTooltipSequence);
 return `<div class="info-tooltip ${escape(className)}"><span>${escape(label)}</span><button class="ob-info-trigger" type="button" aria-label="${escape(label)}" aria-expanded="false" aria-controls="${escape(id)}" data-info-trigger><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/></svg></button><div id="${escape(id)}" class="ob-info-popover" role="dialog" aria-label="${escape(label)}" hidden><div><h3>${escape(label)}</h3><button type="button" data-info-close aria-label="Close information">×</button></div>${paragraphs.map(text=>`<p>${escape(text)}</p>`).join('')}</div></div>`;
}
function closeInfoTooltip(){
 const popup=document.querySelector('.info-tooltip .ob-info-popover:not([hidden])');
 if(!popup)return;
 popup.hidden=true;
 const trigger=popup.parentElement.querySelector('[data-info-trigger]');
 trigger.setAttribute('aria-expanded','false');
 document.querySelectorAll('[data-info-inert]').forEach(el=>{el.inert=false;el.removeAttribute('data-info-inert');});
 return trigger;
}
document.addEventListener('click',event=>{
 const trigger=event.target.closest('[data-info-trigger]');
 if(trigger){
  const wrapper=trigger.closest('.info-tooltip'),popup=wrapper.querySelector('.ob-info-popover'),wasOpen=!popup.hidden;
  closeInfoTooltip();if(wasOpen)return;
  popup.hidden=false;trigger.setAttribute('aria-expanded','true');
  wrapper.style.setProperty('--info-arrow',`${trigger.offsetLeft+trigger.offsetWidth/2-5}px`);
  const page=wrapper.closest('.ob-page, .calendar-layout, .profile-inbox-detail');
  if(page){for(const el of page.querySelectorAll('.ob-scroll > *, .ob-fixed-top, .ob-bottom, .calendar-layout > *, .profile-inbox-detail > *, .profile-inbox-facts > *')){
   if(el.contains(wrapper)||el===wrapper||el.inert)continue;
   el.inert=true;el.setAttribute('data-info-inert','');
  }}
  popup.querySelector('[data-info-close]').focus();
 }else if(event.target.closest('[data-info-close]'))closeInfoTooltip()?.focus();
 else if(!event.target.closest('.ob-info-popover'))closeInfoTooltip();
});
document.addEventListener('keydown',event=>{
 const popup=document.querySelector('.info-tooltip .ob-info-popover:not([hidden])');if(!popup)return;
 if(event.key==='Escape'){event.preventDefault();closeInfoTooltip()?.focus();}
 if(event.key==='Tab'){event.preventDefault();popup.querySelector('[data-info-close]').focus();}
});
