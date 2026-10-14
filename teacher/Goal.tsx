import {useState,useEffect,useRef} from 'react';
import type {Transaction} from '../types';
import {periodRows,today,balance,money,parseCents} from '../money';
function initial(){try{const x=JSON.parse(localStorage.getItem('jarvis-goal')||'null');if(x&&typeof x.name==='string'&&Number.isSafeInteger(x.cents)&&x.cents>0)return x;}catch{}return {name:'每週淨儲蓄',cents:3000};}
export default function Goal({rows}:{rows:Transaction[]}){
 const [goal,setGoal]=useState(initial),[name,setName]=useState(goal.name),[value,setValue]=useState((goal.cents/100).toFixed(2)),[mode,setMode]=useState<'week'|'month'>('week'),[date,setDate]=useState(today()),[error,setError]=useState(''),[celebrate,setCelebrate]=useState(false);
 const net=balance(periodRows(rows,date,mode)),percent=Math.min(100,Math.max(0,net/goal.cents*100)),met=net>=goal.cents;
 const previous=useRef(met);
 useEffect(()=>{if(met&&!previous.current)setCelebrate(true);if(!met)setCelebrate(false);previous.current=met;},[met]);
 useEffect(()=>{try{localStorage.setItem('jarvis-goal',JSON.stringify(goal));}catch{setError('目標未能保存。');}},[goal]);
 return <section className="card"><h2>儲蓄目標 Savings target</h2><form onSubmit={e=>{e.preventDefault();try{if(!name.trim())throw Error('請填寫目標。');setGoal({name:name.trim(),cents:parseCents(value)});setError('');}catch(e){setError((e as Error).message);}}}>
 <label>目標名稱<input value={name} onChange={e=>setName(e.target.value)} maxLength={80}/></label>
 <label>目標金額<input value={value} inputMode="decimal" onChange={e=>setValue(e.target.value)}/></label><button>保存目標</button></form>
 <div className="row"><label>期間<select value={mode} onChange={e=>setMode(e.target.value as 'week'|'month')}><option value="week">該週</option><option value="month">該月</option></select></label><label>參考日期<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div>
 <p>{goal.name} · 這段期間淨儲蓄：{money(net)} / {money(goal.cents)}</p>
 <div className="progress" role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}><div style={{width:percent+'%'}}/></div>
 <div className={"goal-status "+(celebrate?"confirmed":"")}>{met?"TARGET ACHIEVED":"TARGET IN PROGRESS"}</div><p aria-live="polite">{met?'TARGET ACHIEVED / 已達儲蓄目標':'尚差 '+money(Math.max(0,goal.cents-net))+'；可以按情況調整目標。'}</p>
 <p className="muted">進度＝所選期間收入 − 支出；舊有餘額不計入本週淨儲蓄。設定目標不會從錢包扣錢。</p><p role="alert" className="error">{error}</p></section>;
}
