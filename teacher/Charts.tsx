import {useState} from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,PieChart,Pie,Cell,Legend} from 'recharts';
import type {Transaction} from '../types';
import {categoryTotals,periodRows,today} from '../money';
export default function Charts({rows}:{rows:Transaction[]}){
 const [mode,setMode]=useState<'week'|'month'>('week'),[date,setDate]=useState(today()),[chart,setChart]=useState('bar');
 const data=categoryTotals(periodRows(rows,date,mode));
 return <section className="card"><h2>Spending analytics</h2><div className="row">
 <label>Period<select value={mode} onChange={e=>setMode(e.target.value as 'week'|'month')}><option value="week">Week (Monday–Sunday)</option><option value="month">Month</option></select></label>
 <label>Reference date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
 <label>Chart<select value={chart} onChange={e=>setChart(e.target.value)}><option value="bar">Bar chart</option><option value="pie">Pie chart</option></select></label></div>
 <p>Expenses only. Income is excluded from spending totals.</p>
 {data.length?<><div className="chart"><ResponsiveContainer width="100%" height="100%">
 {chart==='bar'?<BarChart data={data}><XAxis dataKey="name" tick={{fill:"#aebcd0"}} stroke="#43566b"/><YAxis tick={{fill:"#aebcd0"}} stroke="#43566b"/><Tooltip contentStyle={{background:"#132237",border:"1px solid #43566b",color:"#eef3f8"}}/><Bar isAnimationActive={false} dataKey="amount" name="Expenses ($)" fill="var(--accent)"/></BarChart>:<PieChart><Pie isAnimationActive={false} data={data} dataKey="amount" nameKey="name" label>{data.map((r,i)=><Cell key={r.name} fill={['var(--accent)','#b8a1ef','#ffc88e','#82b8fc','#ef9fbd'][i%5]}/>)}</Pie><Tooltip contentStyle={{background:"#132237",border:"1px solid #43566b",color:"#eef3f8"}}/><Legend/></PieChart>}
 </ResponsiveContainer></div><p>{data.map(r=>r.name+': $'+r.amount.toFixed(2)).join(' · ')}</p></>:<p>No expenses in this period. Log an expense to see the chart.</p>}</section>;
}
