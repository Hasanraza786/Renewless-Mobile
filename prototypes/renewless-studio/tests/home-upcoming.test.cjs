const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const app=fs.readFileSync('prototypes/renewless-studio/dist/app.js','utf8');
function model(today,records){
 const ctx=vm.createContext({calendarToday:today,document:{addEventListener(){}}});vm.runInContext(fs.readFileSync('prototypes/renewless-studio/dist/money.js','utf8'),ctx);
 vm.runInContext(fs.readFileSync('prototypes/renewless-studio/dist/trial.js','utf8'),ctx);
 ctx.allTrackedRecords=()=>records.map(r=>ctx.trackedRecord(r));
 for(const name of ['calendarRecords','calendarEvents','homeUpcomingEvents'])vm.runInContext(app.split('\n').find(l=>l.startsWith('function '+name+'(')),ctx);
 return ctx;
}
const record=(id,date,extra={})=>({id,name:'Example',renewal:date,cycle:'Monthly',price:'10.00',currency:'USD',...extra});
const ids=ctx=>Array.from(ctx.homeUpcomingEvents(),r=>r.id);
test('seven calendar days include today and day six, exclude day seven and prior dates',()=>{
 const ctx=model('2026-10-28',[record('prior','2026-10-27'),record('today','2026-10-28'),record('last','2026-11-03'),record('outside','2026-11-04')]);
 assert.deepEqual(ids(ctx),['today','last']);
});
test('month-end renewals and same-platform distinct plans stay chronological',()=>{
 const ctx=model('2026-10-29',[record('second','2026-11-02',{name:'Netflix'}),record('first','2026-10-31',{name:'Netflix'}),record('third','2026-11-02',{name:'Netflix'})]);
 assert.deepEqual(ids(ctx),['first','second','third']);
});
test('year and leap-month boundaries retain all eligible events',()=>{
 assert.deepEqual(ids(model('2026-12-29',[record('new-year','2027-01-02')])),['new-year']);
 const ctx=model('2028-02-26',[record('leap','2028-02-29'),record('march','2028-03-03'),record('too-late','2028-03-04')]);
 assert.deepEqual(ids(ctx),['leap','march']);
});
test('trial ending without an expected charge is still included; ended and cancelled plans are excluded',()=>{
 const ctx=model('2026-10-29',[record('trial','',{start:'2026-10-25',trialDays:7,autoRenew:false}),record('ended','',{start:'2026-10-01',trialDays:7,autoRenew:false}),record('cancelled','2026-11-01',{status:'Cancelled'}),record('expired','2026-11-01',{status:'Expired'}),record('undated','')]);
 assert.deepEqual(ids(ctx),['trial']);assert.equal(ctx.homeUpcomingEvents()[0].eventType,'trial-end');assert.equal(ctx.homeUpcomingEvents()[0].expectedCharge,false);
});
test('month-end recurrence is projected from its anchor rather than the current month only',()=>{
 const ctx=model('2027-01-29',[record('anchor','2026-12-31')]);
 assert.deepEqual(Array.from(ctx.homeUpcomingEvents(),r=>r.renewal),['2027-01-31']);
});
test('the date-only window is independent of DST changes',()=>{
 const ctx=model('2026-10-30',[record('end','2026-11-05'),record('outside','2026-11-06')]);assert.deepEqual(ids(ctx),['end']);
});
test('Home and loading remove count cards while preserving the nearest-event and remaining sections',()=>{
 const ctx=model('2026-10-29',[record('next-month','2026-11-01')]);
 Object.assign(ctx,{current:'Home',heading:()=>'<header>Home</header>',homeNextEvent:quiet=>quiet?'No renewals or trials ending':'<section data-nearest>Nearest</section>',homeMonthCard:()=>'<section data-month>Month</section>',topSpendingCard:()=>'<section data-spending>Spending</section>',homeForecast:()=>'<section data-forecast>Forecast</section>',spendRecordRow:r=>`<button data-id="${r.id}">${r.renewal}</button>`,btn:()=>'<button>Add</button>'});
 vm.runInContext(app.slice(app.indexOf('function home(up){'),app.indexOf('\nconst listSamples=')),ctx);
 vm.runInContext(app.slice(app.indexOf('function homeSkeleton(){'),app.indexOf('\nfunction listEmptyState(')),ctx);
 const html=ctx.home(true);assert.match(html,/data-nearest/);assert.match(html,/data-spending/);assert.match(html,/data-month/);assert.match(html,/data-forecast/);assert.doesNotMatch(html,/home-forecast-link/);assert.doesNotMatch(html,/home-upcoming-heading|data-id="next-month"/);assert.doesNotMatch(html,/class="stats"|Tracking|metric-label/);
 ctx.current='Home · quiet';assert.doesNotMatch(ctx.home(true),/class="stats"/);assert.match(ctx.home(true),/No renewals or trials ending/);
 ctx.current='Home · loading';const loading=ctx.home(true);assert.match(loading,/Dashboard loading/);assert.doesNotMatch(loading,/class="stats"|metric-label/);
});

function homeMoneyModel(){const ctx=model('2026-10-29',[]);Object.assign(ctx,{escape:String,detailDate:String,paymentReceiptHistory:()=>[],paymentHistoryTotals:rows=>{const totals={};for(const r of rows)totals[r.currency]=(totals[r.currency]||0)+Math.round(r.amount*100);return Object.entries(totals).map(([currency,cents])=>({currency,amount:(cents/100).toFixed(2)}));},homeMonthEvents:()=>[],calendarTotals:rows=>rows.map(r=>r.currency+' '+r.price).join(' · '),spendRecordRow:r=>`<button data-id="${r.id}">${r.name}</button>`,platformLogo:()=>'<svg></svg>'});for(const name of ['homeEventHasReceipt','homePaidRows','homeMonthCard'])vm.runInContext(app.split('\n').find(l=>l.startsWith('function '+name+'(')),ctx);return ctx;}
test('monthly paid amounts use dated Gmail evidence only, never schedules or future receipts',()=>{const c=homeMoneyModel();c.paymentReceiptHistory=()=>[{id:'a',paidDate:'2026-10-01',source:'Gmail receipt',evidenceId:'ok',currency:'USD',amount:12},{paidDate:'2026-10-30',source:'Gmail receipt',evidenceId:'later',currency:'USD',amount:50},{paidDate:'2026-09-30',source:'Gmail receipt',evidenceId:'old',currency:'USD',amount:9},{paidDate:'2026-10-10',source:'Marked by you',currency:'USD',amount:90},{paidDate:'2026-10-10',source:'Gmail receipt',currency:'USD',amount:90},{paidDate:'2026-10-20',source:'Gmail receipt',evidenceId:'eur',currency:'EUR',amount:7}];const html=c.homeMonthCard();assert.match(html,/\$12.00/);assert.match(html,/€7.00/);assert.doesNotMatch(html,/50.00|90.00|month-progress/);});
test('matched paid cycle is excluded from upcoming, no-charge trials never become charges',()=>{const c=homeMoneyModel();c.paymentReceiptHistory=()=>[{recordId:'paid',cycle:'2026-10-29',paidDate:'2026-10-20',source:'Gmail receipt',evidenceId:'receipt',currency:'USD',amount:10}];c.homeMonthEvents=()=>[record('paid','2026-10-29'),record('expected','2026-10-30',{price:'7.00'}),record('trial','2026-10-30',{trial:true,expectedCharge:false,price:'99.00'})];const html=c.homeMonthCard();assert.match(html,/USD 7.00/);assert.match(html,/1 expected charge/);assert.doesNotMatch(html,/USD 99/);});
test('nearest date has two compact tabs outside the card and See all navigation',()=>{const c=homeMoneyModel();c.nearestEvents=()=>[record('a','2026-10-30',{name:'Alpha'}),record('b','2026-10-30',{name:'Beta',trial:true}),record('c','2026-10-30',{name:'Gamma'}),record('later','2026-11-01')];let html=c.homeNextEvent(false);assert.equal((html.match(/data-home-event=/g)||[]).length,2);assert.match(html,/data-home-upcoming/);assert.doesNotMatch(html,/data-home-more|home-event-more|Show less/);assert.ok(html.indexOf('home-event-tabs')<html.indexOf('<section class="home-renewal">'));vm.runInContext("homeEventView.selected='b'",c);html=c.homeNextEvent(false);assert.match(html,/data-home-event="b" aria-pressed="true"/);assert.match(html,/data-id="b"/);assert.doesNotMatch(html,/data-id="c"|data-id="later"/);});
test('Upcoming keeps distinct plans and only the first eligible event per record across dates',()=>{const c=homeMoneyModel();c.nearestEvents=()=>[record('a','2026-10-30'),record('a','2026-11-30'),record('b','2026-10-30'),record('trial','2026-11-02',{trial:true,expectedCharge:false})];assert.deepEqual(Array.from(c.homeScheduledEvents(),r=>r.id),['a','b','trial']);c.backButton=()=>'<button>Back</button>';const html=c.homeUpcomingScreen();assert.match(html,/data-id="trial"/);assert.match(html,/2026-12-31/);assert.equal((html.match(/data-id="a"/g)||[]).length,1);});

test('Home preview cases have distinct IDs, same-day renewal/trial events and no stored fixture mutation',()=>{const c=homeMoneyModel();c.current='Home · 2 events';let rows=c.homePreviewRecords().map(c.trackedRecord);assert.equal(rows.length,2);assert.equal(new Set(rows.map(r=>r.renewal)).size,1);assert.equal(rows.filter(r=>r.trial).length,1);c.current='Home · multiple events';rows=c.homePreviewRecords();assert.equal(rows.length,3);assert.equal(new Set(rows.map(r=>r.id)).size,3);assert.equal(rows.filter(r=>r.name==='Netflix').length,2);assert.equal(new Set(rows.filter(r=>r.name==='Netflix').map(r=>r.plan)).size,2);c.current='Home';assert.equal(c.homePreviewRecords(),null);assert.equal(vm.runInContext('trialRecords.size',c),0);});

test('Home toolbar is hidden for one event, tabs only for two, and counted See all for three or more',()=>{const c=homeMoneyModel();let rows=[record('a','2026-10-30')];c.nearestEvents=()=>rows;let html=c.homeNextEvent(false);assert.doesNotMatch(html,/home-event-toolbar|data-home-upcoming|data-home-event=/);rows.push(record('b','2026-10-30'));html=c.homeNextEvent(false);assert.equal((html.match(/data-home-event=/g)||[]).length,2);assert.doesNotMatch(html,/data-home-upcoming/);rows.push(record('c','2026-10-30'),record('later','2026-11-01'));html=c.homeNextEvent(false);assert.equal((html.match(/data-home-event=/g)||[]).length,2);assert.match(html,/See all \(4\)/);assert.equal(c.homeScheduledEvents().length,4);});
