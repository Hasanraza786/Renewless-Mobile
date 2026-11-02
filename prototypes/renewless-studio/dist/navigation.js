'use strict';
// In-memory Alerts detours only. No form secrets, chat media or navigation drafts are persisted.
const alertsReturnStack=[];
let alertsRestore=null,alertsRestoring=false,accountPaymentsSnapshot=null;
function appHeaderScope(name){return !groups.Auth.includes(name)&&!onboardingScreens.includes(name)&&!['Add sheet','Widgets','Delete confirm'].includes(name);}
function appMainPayments(){return current.startsWith('Payments')&&!paymentsView.recordId;}
function appBell(){return `<button type="button" class="header-alerts" data-open-app-alerts aria-label="Alerts">${alertBell()}</button>`;}
function captureAlertsReturn(){const root=document.getElementById('upgraded');return {screen:current,back:previous,manual:state.manual?{...state.manual}:null,name:demoName,price:demoPrice,payments:{...paymentsView},forms:[...root.querySelectorAll('form')].map(f=>({...f.dataset})),fields:[...root.querySelectorAll('input:not([type=file]),textarea,select')].map(f=>({value:f.value,checked:f.checked,selected:f.multiple?[...f.selectedOptions].map(o=>o.value):null})),scroll:[...root.querySelectorAll('.content,.ai-message-area')].map(e=>e.scrollTop)};}
function openAppAlerts(){
 if(current.startsWith('Alerts'))return;
 if(isAiChatScreen()){const s=aiTextSession();if(s.voiceRecording||s.voiceDraft||s.image||s.imageLoading||s.saving){toast('Finish or remove your attachment or recording before opening Alerts.');return;}}
 if(document.querySelector('#upgraded [aria-busy="true"]')){toast('Please wait for your current action to finish.');return;}
 alertsReturnStack.push(captureAlertsReturn());go('Alerts');
}
function returnFromAppAlerts(){const snapshot=alertsReturnStack.pop();if(!snapshot){go('Home');return;}alertsRestore=snapshot;alertsRestoring=true;state.manual=snapshot.manual;demoName=snapshot.name;demoPrice=snapshot.price;Object.assign(paymentsView,snapshot.payments);try{go(snapshot.screen);previous=snapshot.back;}finally{alertsRestoring=false;}}
function beforeAppNavigation(name){if(groups.Auth.includes(name)||onboardingScreens.includes(name))resetAppNavigation();if(appMainPayments()&&name!==current)accountPaymentsSnapshot={...paymentsView};}
function openAccountPayments(){Object.assign(paymentsView,accountPaymentsSnapshot||{query:'',year:calendarToday.slice(0,4),month:'all',chartStart:6,inspectMonth:calendarToday.slice(5,7)});paymentsView.recordId='';paymentsView.recordName='';paymentsView.detailOrigin='';go('Payments');}
function resetAppNavigation(){alertsReturnStack.length=0;alertsRestore=null;alertsRestoring=false;accountPaymentsSnapshot=null;}
function appNavigationAfterRender(){
 const root=document.getElementById('upgraded');if(!root)return;
 if(appHeaderScope(current)){
  const head=root.querySelector('.head,.ai-chat-header');
  if(head&&!current.startsWith('Alerts')&&!head.querySelector('[data-open-app-alerts]')){
   const actions=document.createElement('div');actions.className='header-actions';actions.innerHTML=appBell();
   for(const child of [...head.children])if((child.matches('button,a')&&!child.matches('.back,.header-back'))||child.tagName==='IMG')actions.append(child);
   head.append(actions);
  }
 }
 if(alertsRestore&&alertsRestore.screen===current){const snap=alertsRestore;alertsRestore=null;[...root.querySelectorAll('form')].forEach((f,i)=>Object.assign(f.dataset,snap.forms[i]||{}));[...root.querySelectorAll('input:not([type=file]),textarea,select')].forEach((f,i)=>{const v=snap.fields[i];if(v){if(f.multiple&&v.selected)[...f.options].forEach(o=>o.selected=v.selected.includes(o.value));else f.value=v.value;f.checked=v.checked;}});const manual=root.querySelector('.manual-form');if(manual){syncTrialForm(manual);syncPriceEdit(manual);}const reminders=root.querySelector('[data-account-reminders]');if(reminders){const disabled=!reminders.elements.enabled.checked;reminders.querySelectorAll('[name=renewals],[name=trials],[data-reminder-defaults]').forEach(el=>el.disabled=disabled);reminders.querySelector('[data-global-custom]').hidden=![...reminders.elements.timing.selectedOptions].some(o=>o.value==='custom');}syncSelectControls();if(isAiChatScreen())aiSyncComposer();[...root.querySelectorAll('.content,.ai-message-area')].forEach((el,i)=>el.scrollTop=snap.scroll[i]||0);root.querySelector('[data-open-app-alerts]')?.focus({preventScroll:true});}
 if(appHeaderScope(current))document.querySelector('[data-variant=upgraded] .variant-title small').textContent=current==='Reminder settings'?'Reminder dropdown/typography · pending review':current.startsWith('Profile')?'Profile · Delete account/header pending review':'Navigation/header · pending review';
}
document.addEventListener('click',event=>{
 const tab=event.target.closest('[data-app-tab]');if(tab){event.preventDefault();event.stopImmediatePropagation();alertsReturnStack.length=0;alertsRestore=null;if(tab.dataset.appTab==='Payments')openAccountPayments();else go(tab.dataset.appTab);return;}
 if(event.target.closest('[data-open-app-alerts]')){event.preventDefault();event.stopImmediatePropagation();openAppAlerts();return;}
 if(event.target.closest('[data-app-alerts-back]')){event.preventDefault();event.stopImmediatePropagation();returnFromAppAlerts();return;}
 if(current.startsWith('Profile')&&event.target.closest('[data-go="Payments"]')){event.preventDefault();event.stopImmediatePropagation();openAccountPayments();}
});
