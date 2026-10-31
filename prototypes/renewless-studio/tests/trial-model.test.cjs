const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const context=vm.createContext({document:{addEventListener(){}},console});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/trial.js'),'utf8'),context);
vm.runInContext(`const calendarToday='2026-10-27'; const listSamples=[]; const relatedPreviewRecords=[];`,context);
const app=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
for(const name of ['calendarEvents','subscriptionStatus','calendarTotals']){
 const line=app.split('\n').find(line=>line.startsWith('function '+name+'('));
 vm.runInContext(line,context);
}
const run=s=>vm.runInContext(s,context);
test('duration uses date-only calendar math including leap/year boundaries',()=>{
 assert.equal(run("plusDays('2028-02-27',3)"),'2028-03-01');
 assert.equal(run("plusDays('2026-12-30',7)"),'2027-01-06');
});
test('monthly recurrence retains original month-end anchor',()=>{
 assert.equal(run("nextCycle('2027-01-31','Monthly',1)"),'2027-02-28');
 assert.equal(run("nextCycle('2027-01-31','Monthly',2)"),'2027-03-31');
});
test('exact source trial end wins over calculated duration',()=>{
 assert.equal(run("trialEnd({start:'2026-10-01',trialDays:7,trialEnd:'2026-10-10',trialEndSource:'exact'})"),'2026-10-10');
});
test('expired auto-renew trial advances recurring schedule without payment confirmation',()=>{
 assert.equal(run("trackedRecord({name:'Test',start:'2026-09-01',trialDays:7,cycle:'Monthly',autoRenew:true}).renewal"),'2026-11-08');
 assert.equal(run('paymentRecords.size'),0);
 assert.equal(run("trackedRecord({name:'Test',start:'2026-09-01',trialDays:7,autoRenew:true}).trial"),false);
});
test('non-renewing ended trial has no next charge and explicit status',()=>{
 assert.equal(run("trackedRecord({name:'Test',start:'2026-10-01',trialDays:7,autoRenew:false}).renewal"),'');
 assert.equal(run("subscriptionStatus({name:'Test',start:'2026-10-01',trialDays:7,autoRenew:false}).label"),'Trial ended');
});
test('trial ending day is one event, not also a renewal; next cycle follows anchor',()=>{
 run("function calendarRecords(){return [trackedRecord({id:'t',name:'Test',price:'12',currency:'USD',start:'2026-10-24',trialDays:7,cycle:'Monthly',autoRenew:true})];}");
 assert.equal(run("calendarEvents({year:2026,month:9}).length"),1);
 assert.equal(run("calendarEvents({year:2026,month:9})[0].eventType"),'trial-end');
 assert.equal(run("calendarEvents({year:2026,month:10})[0].renewal"),'2026-11-30');
});
test('auto-renew off trial event is visible but excluded from scheduled monetary totals',()=>{
 run("function calendarRecords(){return [trackedRecord({id:'t',name:'Test',price:'12',currency:'USD',start:'2026-10-24',trialDays:7,cycle:'Monthly',autoRenew:false})];}");
 assert.equal(run("calendarEvents({year:2026,month:9}).length"),1);
 assert.equal(run("calendarTotals(calendarEvents({year:2026,month:9}))"),'No scheduled charges');
 assert.equal(run("calendarEvents({year:2026,month:10}).length"),0);
});
function trialForm(){const nodes={};const field=(name,value='')=>{const error={hidden:true,textContent:''},small={textContent:'Optional'},label={hidden:false,firstChild:{textContent:'Amount'},querySelector:()=>small};let invalid='false';return {name,value,required:false,checked:true,validity:{valid:true},nextElementSibling:error,closest:()=>label,getAttribute:()=>invalid,setAttribute:(_,v)=>{invalid=v;}};};const form={dataset:{},elements:{},querySelector:key=>nodes[key]};for(const [name,value]of Object.entries({trialDuration:'No trial',trialDaysCustom:'',start:'',renewal:'2026-11-30',price:'12',autoRenew:''}))form.elements[name]=field(name,value);for(const key of ['[data-custom-trial]','[data-trial-settings]','.trial-calculation','[data-trial-tracking-hint]'])nodes[key]={hidden:false,textContent:'',classList:{toggle(){}}};context.form=form;context.detailDate=v=>v;return {form,nodes};}
test('trial entry replaces renewal with calculated end and No trial restores previous renewal',()=>{const {form,nodes}=trialForm();run('syncTrialForm(form)');form.elements.trialDuration.value='14 days';form.elements.start.value='2026-10-31';run('syncTrialForm(form)');assert.equal(form.elements.renewal.value,'2026-11-14');assert.equal(form.elements.start.required,true);assert.match(nodes['.trial-calculation'].textContent,/2026-11-14/);form.elements.trialDuration.value='No trial';run('syncTrialForm(form)');assert.equal(form.elements.renewal.value,'2026-11-30');assert.equal(form.elements.start.required,false);assert.equal(nodes['[data-trial-settings]'].hidden,true);});
test('trial requires start; correction clears inline error; custom days reject zero/fractions/over-limit',()=>{const {form}=trialForm();form.elements.trialDuration.value='Custom';form.elements.trialDaysCustom.value='21';assert.equal(run('validateTrialForm(form)'),false);assert.match(form.elements.start.nextElementSibling.textContent,/Select a start date/);form.elements.start.value='2026-10-31';run('syncTrialForm(form)');assert.equal(form.elements.start.nextElementSibling.hidden,true);for(const value of ['0','1.5','366']){form.elements.trialDaysCustom.value=value;assert.equal(run('validateTrialForm(form)'),false);}form.elements.trialDaysCustom.value='21';assert.equal(run('validateTrialForm(form)'),true);assert.equal(form.elements.renewal.value,'2026-11-21');});
test('Edit preserves exact imported trial end until start/duration changes; tracking-off copy agrees',()=>{const {form,nodes}=trialForm();form.dataset.originalTrial=JSON.stringify({source:'exact',start:'2026-10-31',days:7,end:'2026-11-10'});form.elements.start.value='2026-10-31';form.elements.trialDuration.value='7 days';run('syncTrialForm(form)');assert.equal(form.elements.renewal.value,'2026-11-10');form.elements.trialDuration.value='14 days';form.elements.autoRenew.checked=false;run('syncTrialForm(form)');assert.equal(form.elements.renewal.value,'2026-11-14');assert.match(nodes['[data-trial-tracking-hint]'].textContent,/No renewals are projected/);});
