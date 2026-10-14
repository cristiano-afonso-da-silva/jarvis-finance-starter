import {useEffect,useState} from 'react';
import type {Transaction,Kind} from './types';
import {balance,money,parseCents,today} from './money';
import HudCore,{type Transfer} from './components/HudCore';
import ThemeControls from './components/ThemeControls';
import Charts from './components/Charts';
import Goal from './components/Goal';
import Advisor from './components/Advisor';
const categories=['飲食 Food','交通 Transport','學習 Learning','娛樂 Entertainment','其他 Other'];
const seed=():Transaction[]=>[{id:'initial',date:today(),item:'爸媽零用錢',kind:'income',cents:10000,category:'其他 Other'}];
function load():Transaction[]{try{const a=JSON.parse(localStorage.getItem('space-bank-v1')||'null');return Array.isArray(a)&&a.every(r=>r&&typeof r.id==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&typeof r.item==='string'&&['income','expense'].includes(r.kind)&&Number.isSafeInteger(r.cents)&&r.cents>0&&typeof r.category==='string')?a:seed();}catch{return seed();}}
export default function App(){
 const [rows,setRows]=useState<Transaction[]>(load),[event,setEvent]=useState<Transfer|null>(null);
 const [item,setItem]=useState(''),[amount,setAmount]=useState(''),[kind,setKind]=useState<Kind>('expense'),[date,setDate]=useState(today()),[category,setCategory]=useState(categories[0]),[error,setError]=useState(''),[edit,setEdit]=useState<string|null>(null),[saved,setSaved]=useState('');
 const cents=balance(rows);
 useEffect(()=>{try{localStorage.setItem('space-bank-v1',JSON.stringify(rows));setSaved('已儲存在這部電腦 Saved locally');}catch{setSaved('無法保存，關閉前請保留畫面。');}},[rows]);
 function submit(e:React.FormEvent){e.preventDefault();try{
  if(!item.trim()||!date) throw Error('請填寫項目及日期。');
  const value=parseCents(amount);
  const row:Transaction={id:edit||crypto.randomUUID(),date,item:item.trim(),kind,cents:value,category};
  const next=edit?rows.map(r=>r.id===edit?row:r):[...rows,row];
  if(balance(next)<0) throw Error('餘額不足：請先記錄真實收入，或檢查金額。');
  setRows(next);
  if(!edit) setEvent({id:Date.now(),kind,cents:value,before:cents,after:balance(next)});
  else setEvent(null);
  setItem('');setAmount('');setEdit(null);setError('');
 }catch(e){setError((e as Error).message);}}
 function remove(id:string){const next=rows.filter(r=>r.id!==id);if(balance(next)<0){setError('刪除這筆收入會令餘額變負，請先處理相關支出。');return;}setRows(next);setEvent(null);if(edit===id){setEdit(null);setItem('');setAmount('');}}
 // TODO(STUDENT-UI): 修改控制器名稱及介面主色；保留交易邏輯。
 return <main><header><span className="tag">AI 未來創作者 / LAB 03</span><h1>JARVIS 零用錢控制器</h1><p>PERSONAL FINANCE INTERFACE · 記錄現金流，分析選擇。</p></header>
 <ThemeControls/><HudCore cents={cents} event={event} transactions={rows.length}/>
 <section className="card"><h2>{edit?'修改記錄 Edit':'新增記錄 Log a transaction'}</h2><form onSubmit={submit}>
 <label>日期 Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label>
 <label>類型 Type<select value={kind} onChange={e=>setKind(e.target.value as Kind)}><option value="expense">支出 Expense</option><option value="income">收入 Income</option></select></label>
 <label>項目 Item<input value={item} onChange={e=>setItem(e.target.value)} placeholder="例如：午餐 / 零用錢" maxLength={80} required/></label>
 <label>金額 Amount<input inputMode="decimal" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="50.00" required/></label>
 <label>分類 Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
 <button>{edit?'保存修改 Save':'記錄交易 Log'}</button>{edit&&<button type="button" onClick={()=>{setEdit(null);setItem('');setAmount('');}}>取消 Cancel</button>}
 </form><p role="alert" className="error">{error}</p></section>
 <section className="card"><h2>交易紀錄 Transaction ledger</h2><p className="muted">{saved} · 課堂用虛構資料 · 金額單位 $</p><div className="table-wrap"><table><thead><tr><th>日期</th><th>項目</th><th>分類</th><th>類型</th><th>金額</th><th>操作</th></tr></thead><tbody>
 {rows.map(r=><tr key={r.id}><td>{r.date}</td><td>{r.item}</td><td>{r.category}</td><td>{r.kind==='income'?'收入':'支出'}</td><td className={r.kind}>{r.kind==='income'?'+':'−'}{money(r.cents)}</td><td><button className="small" onClick={()=>{setEdit(r.id);setDate(r.date);setItem(r.item);setAmount((r.cents/100).toFixed(2));setKind(r.kind);setCategory(r.category);}}>改</button><button className="small" onClick={()=>remove(r.id)}>刪</button></td></tr>)}
 {!rows.length&&<tr><td colSpan={6}>未有記錄，新增第一筆收入吧。</td></tr>}</tbody></table></div></section>
 <Charts rows={rows}/><Goal rows={rows}/><Advisor rows={rows}/>
 <footer>記帳獲得的是理解，建立自己的消費判斷。</footer></main>;
}
