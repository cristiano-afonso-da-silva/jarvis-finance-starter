import {useState,useEffect,useRef} from 'react';
import type {Transaction} from '../types';
import {periodRows,today,balance,money,parseCents} from '../money';
function initial(){try{const x=JSON.parse(localStorage.getItem('jarvis-goal')||'null');if(x&&typeof x.name==='string'&&Number.isSafeInteger(x.cents)&&x.cents>0)return x;}catch{}return {name:'Weekly savings',cents:3000};}
export default function Goal({rows}:{rows:Transaction[]}){
 const [goal,setGoal]=useState(initial),[name,setName]=useState(goal.name),[value,setValue]=useState((goal.cents/100).toFixed(2)),[mode,setMode]=useState<'week'|'month'>('week'),[date,setDate]=useState(today()),[error,setError]=useState(''),[celebrate,setCelebrate]=useState(false);
 const net=balance(periodRows(rows,date,mode)),percent=Math.min(100,Math.max(0,net/goal.cents*100)),met=net>=goal.cents;
 const previous=useRef(met);
 useEffect(()=>{if(met&&!previous.current)setCelebrate(true);if(!met)setCelebrate(false);previous.current=met;},[met]);
 useEffect(()=>{try{localStorage.setItem('jarvis-goal',JSON.stringify(goal));}catch{setError('Your target could not be saved.');}},[goal]);
 return <section className="card"><h2>Savings target</h2><form onSubmit={e=>{e.preventDefault();try{if(!name.trim())throw Error('Enter a target name.');setGoal({name:name.trim(),cents:parseCents(value)});setError('');}catch(e){setError((e as Error).message);}}}>
 <label>Target name<input value={name} onChange={e=>setName(e.target.value)} maxLength={80}/></label>
 <label>Target amount<input value={value} inputMode="decimal" onChange={e=>setValue(e.target.value)}/></label><button>Save target</button></form>
 <div className="row"><label>Period<select value={mode} onChange={e=>setMode(e.target.value as 'week'|'month')}><option value="week">Week</option><option value="month">Month</option></select></label><label>Reference date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div>
 <p>{goal.name} · Net savings in this period:{money(net)} / {money(goal.cents)}</p>
 <div className="progress" role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}><div style={{width:percent+'%'}}/></div>
 <div className={"goal-status "+(celebrate?"confirmed":"")}>{met?"TARGET ACHIEVED":"TARGET IN PROGRESS"}</div><p aria-live="polite">{met?'TARGET ACHIEVED':'Remaining: '+money(Math.max(0,goal.cents-net))+'. You can adjust your target.'}</p>
 <p className="muted">Progress uses income minus expenses in the selected period. Earlier balances are excluded. Setting a target does not deduct money.</p><p role="alert" className="error">{error}</p></section>;
}
