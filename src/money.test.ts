import {test} from 'node:test';import assert from 'node:assert/strict';
import {balance,parseCents,categoryTotals,periodRows} from './money';
import type {Transaction} from './types';
const rows:Transaction[]=[{id:'1',date:'2026-10-12',item:'零用錢',kind:'income',cents:10000,category:'其他'},{id:'2',date:'2026-10-13',item:'午餐',kind:'expense',cents:3000,category:'飲食'},{id:'3',date:'2026-10-14',item:'玩具',kind:'expense',cents:2000,category:'娛樂'},{id:'4',date:'2026-10-11',item:'上週',kind:'income',cents:1000,category:'其他'}];
test('money stays exact in cents and rejects invalid values',()=>{assert.equal(parseCents('0.10')+parseCents('0.20'),30);for(const s of ['0','-1','1.234','NaN',''])assert.throws(()=>parseCents(s));});
test('same week is Monday through Sunday; chart excludes income',()=>{const week=periodRows(rows,'2026-10-14','week');assert.equal(week.length,3);assert.equal(balance(week),5000);assert.deepEqual(categoryTotals(week),[{name:'飲食',amount:30},{name:'娛樂',amount:20}]);assert.equal(periodRows(rows,'2026-11-01','month').length,0);});
