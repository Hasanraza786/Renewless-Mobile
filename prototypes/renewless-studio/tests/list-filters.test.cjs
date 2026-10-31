const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
const context=vm.createContext({subscriptionStatus:r=>({key:r.status})});
vm.runInContext(source.split('\n').find(line=>line.startsWith('function matchesListFilters(')),context);
function matches(status,selected,query='',name='Spotify'){return context.matchesListFilters({status,name},new Set(selected),query);}
test('no selected statuses includes all statuses',()=>assert.equal(matches('cancelled',[]),true));
test('multiple statuses combine with OR',()=>{assert.equal(matches('trial',['active','trial']),true);assert.equal(matches('active',['active','trial']),true);assert.equal(matches('expired',['active','trial']),false);});
test('search combines with status set using AND, ignoring case and surrounding spaces',()=>{assert.equal(matches('trial',['trial'],' SPOT '),true);assert.equal(matches('trial',['trial'],'Netflix'),false);assert.equal(matches('cancelled',['trial'],'Spotify'),false);});
test('removing last status restores all statuses but retains the search constraint',()=>{assert.equal(matches('active',[],'Spot'),true);assert.equal(matches('active',[],'Netflix'),false);});
