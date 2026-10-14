import type {Transaction} from './types';
export const money = (cents:number) => '$'+(cents/100).toFixed(2);
export function parseCents(s:string):number {
 if (!/^\d+(\.\d{1,2})?$/.test(s)) throw Error('請輸入正數，最多兩位小數。');
 const [whole,frac='']=s.split('.');
 const n=Number(whole)*100+Number(frac.padEnd(2,'0'));
 if (!Number.isSafeInteger(n)||n<=0||n>100000000) throw Error('金額須大於 0，並不超過 1,000,000。');
 return n;
}
export const balance = (rows:Transaction[]) => rows.reduce((n,r)=>n+(r.kind==='income'?r.cents:-r.cents),0);
// TODO(STUDENT-CHART): 圖表只統計選定期間的 expense，不可把 income 當支出。
export function categoryTotals(rows:Transaction[]) {
 const totals:Record<string,number>={};
 for (const r of rows) if(r.kind==='expense') totals[r.category]=(totals[r.category]||0)+r.cents;
 return Object.entries(totals).map(([name,cents])=>({name,amount:cents/100}));
}
export function periodRows(rows:Transaction[], date:string, mode:'week'|'month') {
 const d=new Date(date+'T12:00:00');
 const start=new Date(d),end=new Date(d);
 if(mode==='week'){start.setDate(d.getDate()-((d.getDay()+6)%7));end.setTime(start.getTime());end.setDate(start.getDate()+6);}
 else {start.setDate(1);end.setMonth(d.getMonth()+1,0);}
 const iso=(x:Date)=>[x.getFullYear(),String(x.getMonth()+1).padStart(2,'0'),String(x.getDate()).padStart(2,'0')].join('-');
 return rows.filter(r=>r.date>=iso(start)&&r.date<=iso(end));
}
export const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
