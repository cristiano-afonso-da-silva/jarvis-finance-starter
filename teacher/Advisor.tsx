import {useState} from 'react';
import type {Transaction,Analysis,Judgment} from '../types';
import {money} from '../money';
const names={need:'需要 Need',want:'想要 Want',unsure:'未確定 Unsure'};
function initial():Record<string,{label:Judgment;reason:string}>{try{return JSON.parse(localStorage.getItem('jarvis-reflections')||'{}');}catch{return {};}}
export default function Advisor({rows}:{rows:Transaction[]}){
 const expenses=rows.filter(r=>r.kind==='expense');
 const [id,setId]=useState(''),[context,setContext]=useState(''),[result,setResult]=useState<Analysis|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[own,setOwn]=useState<Judgment>('unsure'),[why,setWhy]=useState(''),[reflections,setReflections]=useState(initial);
 const selected=expenses.find(r=>r.id===id);
 async function analyze(){if(!selected)return;setBusy(true);setResult(null);setError('');try{
 const response=await fetch('/api/classify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({item:selected.item,cents:selected.cents,context}),signal:AbortSignal.timeout(20000)});
 const data=await response.json();if(!response.ok)throw Error(data.error||'AI 請求失敗');
 if(!['mock','live'].includes(data.mode)||!['need','want','unsure'].includes(data.label)||!['reason','question','alternative'].every(k=>typeof data[k]==='string'))throw Error('AI 回傳格式不正確');
 setResult(data);
 }catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 function save(){if(!selected||!why.trim()){setError('請選擇記錄，並寫一句自己的理由。');return;}const next={...reflections,[selected.id]:{label:own,reason:why.trim()}};setReflections(next);try{localStorage.setItem('jarvis-reflections',JSON.stringify(next));setError('');}catch{setError('反思未能保存。');}}
 return <section className="card"><h2>AI 消費判斷 Decision advisor</h2><p>先記錄自己的判斷，再比較 AI 理由；最後由你決定。</p>
 {!expenses.length?<p>先記錄一筆支出，再一起思考。</p>:<><label>選一筆支出<select disabled={busy} value={id} onChange={e=>{setId(e.target.value);setResult(null);setContext('');const r=reflections[e.target.value];setOwn(r?.label||'unsure');setWhy(r?.reason||'');}}><option value="">請選擇</option>{expenses.map(r=><option key={r.id} value={r.id}>{r.item} · {money(r.cents)}</option>)}</select></label>
 <label>你的用途 / 已有替代品<textarea disabled={busy} value={context} onChange={e=>{setContext(e.target.value);setResult(null);}} placeholder="例如：舊鞋破了，上體育堂需要；家中沒有其他合適鞋。" maxLength={500}/></label>
 <label>我先估／最後判斷<select value={own} onChange={e=>setOwn(e.target.value as Judgment)}>{Object.entries(names).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
 <button disabled={!selected||busy} onClick={analyze}>{busy?'正在分析…':'分析消費'}</button>
 {result&&<div className="judgment"><p><b>{result.mode==='mock'?'示範模式 MOCK（固定回覆，未連接 AI）':'真正 AI 回覆 LIVE'}</b></p><h3>{names[result.label]}</h3><p>{result.reason}</p><p>追問：{result.question}</p><p>替代選擇：{result.alternative}</p></div>}

 <label>我同意 / 不同意，因為…<textarea value={why} onChange={e=>setWhy(e.target.value)} maxLength={500}/></label><button onClick={save}>保存我的反思</button>{selected&&reflections[selected.id]&&<p>已保存：{names[reflections[selected.id].label]} · {reflections[selected.id].reason}</p>}</>}
 <p role="alert" className="error">{error}</p></section>;
}
