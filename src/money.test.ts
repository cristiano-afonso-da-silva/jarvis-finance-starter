import {test} from 'node:test';import assert from 'node:assert/strict';
import {balance,parseCents,categoryTotals,periodRows} from './money';
import type {Transaction} from './types';
const rows:Transaction[]=[{id:'1',date:'2026-10-12',item:'Allowance',kind:'income',cents:10000,category:'Other'},{id:'2',date:'2026-10-13',item:'Lunch',kind:'expense',cents:3000,category:'Food'},{id:'3',date:'2026-10-14',item:'Game subscription',kind:'expense',cents:2000,category:'Entertainment'},{id:'4',date:'2026-10-11',item:'Previous week',kind:'income',cents:1000,category:'Other'}];
test('money stays exact in cents and rejects invalid values',()=>{assert.equal(parseCents('0.10')+parseCents('0.20'),30);for(const s of ['0','-1','1.234','NaN',''])assert.throws(()=>parseCents(s));});
test('same week is Monday through Sunday; chart excludes income',()=>{const week=periodRows(rows,'2026-10-14','week');assert.equal(week.length,3);assert.equal(balance(week),5000);assert.deepEqual(categoryTotals(week),[{name:'Food',amount:30},{name:'Entertainment',amount:20}]);assert.equal(periodRows(rows,'2026-11-01','month').length,0);});
