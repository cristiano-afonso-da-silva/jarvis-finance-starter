import {useState} from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,PieChart,Pie,Cell,Legend} from 'recharts';
import type {Transaction} from '../types';
import {categoryTotals,periodRows,today} from '../money';
export default function Charts({rows}:{rows:Transaction[]}){
 const [mode,setMode]=useState<'week'|'month'>('week'),[date,setDate]=useState(today()),[chart,setChart]=useState('bar');
 const data=categoryTotals(periodRows(rows,date,mode));
 return <section className="card"><h2>支出分析 Spending analytics</h2><div className="row">
 <label>期間<select value={mode} onChange={e=>setMode(e.target.value as 'week'|'month')}><option value="week">該週（星期一至日）</option><option value="month">該月</option></select></label>
 <label>參考日期<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
 <label>圖表<select value={chart} onChange={e=>setChart(e.target.value)}><option value="bar">棒形圖 Bar</option><option value="pie">圓形圖 Pie</option></select></label></div>
 <p>只統計支出。收入不屬於「錢花在哪裏」。</p>
 {data.length?<><div className="chart"><ResponsiveContainer width="100%" height="100%">
 {chart==='bar'?<BarChart data={data}><XAxis dataKey="name" tick={{fill:"#aebcd0"}} stroke="#43566b"/><YAxis tick={{fill:"#aebcd0"}} stroke="#43566b"/><Tooltip contentStyle={{background:"#132237",border:"1px solid #43566b",color:"#eef3f8"}}/><Bar isAnimationActive={false} dataKey="amount" name="支出 $" fill="var(--accent)"/></BarChart>:<PieChart><Pie isAnimationActive={false} data={data} dataKey="amount" nameKey="name" label>{data.map((r,i)=><Cell key={r.name} fill={['var(--accent)','#b8a1ef','#ffc88e','#82b8fc','#ef9fbd'][i%5]}/>)}</Pie><Tooltip contentStyle={{background:"#132237",border:"1px solid #43566b",color:"#eef3f8"}}/><Legend/></PieChart>}
 </ResponsiveContainer></div><p>{data.map(r=>r.name+': $'+r.amount.toFixed(2)).join(' · ')}</p></>:<p>這段時間未有支出，無需畫零值圓形圖。</p>}</section>;
}
