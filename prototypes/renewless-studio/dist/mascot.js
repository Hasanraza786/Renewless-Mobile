/* Shared static mascot presentation. Artwork stays separate from the R brand mark. */
function mascotView({expression='neutral',size=108,artworkScale=1.05,halo=true,label='',className=''}={}){
 const assets={neutral:'loop-mascot.svg',sad:'loop-sad.svg',happy:'loop-happy.svg',scanning:'loop-scanning.svg'};
 const asset=assets[expression]||assets.neutral;
 const diameter=Number.isFinite(Number(size))?Math.max(64,Math.min(180,Number(size))):108;
 const scale=Number.isFinite(Number(artworkScale))?Math.max(.6,Math.min(1.4,Number(artworkScale))):1.05;
 const safe=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return `<span class="mascot-view ${halo?'':'mascot-view-plain'} ${safe(className)}" style="--mascot-size:${diameter}px;--mascot-artwork-size:${Math.round(diameter*scale)}px" ${label?`role="img" aria-label="${safe(label)}"`:'aria-hidden="true"'}><img src="assets/${asset}" alt="" aria-hidden="true" draggable="false"></span>`;
}
