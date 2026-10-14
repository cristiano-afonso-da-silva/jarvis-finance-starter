import {useState} from 'react';
import type {Transaction,Analysis,Judgment} from '../types';
import {money} from '../money';
const names={need:'Need',want:'Want',unsure:'Unsure'};
function initial():Record<string,{label:Judgment;reason:string}>{try{return JSON.parse(localStorage.getItem('jarvis-reflections')||'{}');}catch{return {};}}
export default function Advisor({rows}:{rows:Transaction[]}){
 const expenses=rows.filter(r=>r.kind==='expense');
 const [id,setId]=useState(''),[context,setContext]=useState(''),[result,setResult]=useState<Analysis|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[own,setOwn]=useState<Judgment>('unsure'),[why,setWhy]=useState(''),[reflections,setReflections]=useState(initial);
 const selected=expenses.find(r=>r.id===id);
 async function analyze(){if(!selected)return;setBusy(true);setResult(null);setError('');try{
 const response=await fetch('/api/classify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({item:selected.item,cents:selected.cents,context}),signal:AbortSignal.timeout(20000)});
 const data=await response.json();if(!response.ok)throw Error(data.error||'The AI request failed.');
 if(!['mock','live'].includes(data.mode)||!['need','want','unsure'].includes(data.label)||!['reason','question','alternative'].every(k=>typeof data[k]==='string'))throw Error('The AI response has an invalid format.');
 setResult(data);
 }catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 function save(){if(!selected||!why.trim()){setError('Select a transaction and write your own reason.');return;}const next={...reflections,[selected.id]:{label:own,reason:why.trim()}};setReflections(next);try{localStorage.setItem('jarvis-reflections',JSON.stringify(next));setError('');}catch{setError('Your reflection could not be saved.');}}
 return <section className="card"><h2>AI Decision advisor</h2><p>Record your own view, then compare the AI reasoning. The final decision is yours.</p>
 {!expenses.length?<p>Log an expense before requesting an analysis.</p>:<><label>Select an expense<select disabled={busy} value={id} onChange={e=>{setId(e.target.value);setResult(null);setContext('');const r=reflections[e.target.value];setOwn(r?.label||'unsure');setWhy(r?.reason||'');}}><option value="">Choose a transaction</option>{expenses.map(r=><option key={r.id} value={r.id}>{r.item} · {money(r.cents)}</option>)}</select></label>
 <label>Purpose / existing alternatives<textarea disabled={busy} value={context} onChange={e=>{setContext(e.target.value);setResult(null);}} placeholder="e.g. My old shoes are damaged. I need a suitable pair for PE and have no alternative." maxLength={500}/></label>
 <label>My initial / final judgment<select value={own} onChange={e=>setOwn(e.target.value as Judgment)}>{Object.entries(names).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
 <button disabled={!selected||busy} onClick={analyze}>{busy?'Analysing…':'Analyse spending'}</button>
 {result&&<div className="judgment"><p><b>{result.mode==='mock'?'MOCK MODE — fixed example, not connected to AI':'LIVE AI RESPONSE'}</b></p><h3>{names[result.label]}</h3><p>{result.reason}</p><p>Follow-up: {result.question}</p><p>Alternative: {result.alternative}</p></div>}

 <label>I agree / disagree because…<textarea value={why} onChange={e=>setWhy(e.target.value)} maxLength={500}/></label><button onClick={save}>Save my reflection</button>{selected&&reflections[selected.id]&&<p>Saved: {names[reflections[selected.id].label]} · {reflections[selected.id].reason}</p>}</>}
 <p role="alert" className="error">{error}</p></section>;
}
