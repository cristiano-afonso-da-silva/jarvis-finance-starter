import {money} from '../money';
export type Transfer={id:number;kind:'income'|'expense';cents:number;before:number;after:number};
export default function HudCore({cents,event,transactions}:{cents:number;event:Transfer|null;transactions:number}){
 return <section className="hud" aria-label="資金控制器 HUD">
  <div className="hud-top"><span>FINANCE CONTROL / LOCAL SESSION</span><span className="status-dot">SYSTEM READY</span></div>
  <div className="hud-layout"><div className="telemetry"><span className="eyebrow">ACCOUNT BALANCE</span><strong>{money(cents)}</strong><p>可用餘額</p><div className="signal-bars" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{height:(12+(i%4)*8)+'px'}}/>)}</div></div>
  <div className="core"><svg viewBox="0 0 320 320" aria-hidden="true"><circle className="core-outline" cx="160" cy="160" r="146"/><circle className="core-ring outer" cx="160" cy="160" r="128"/><circle className="core-ring inner" cx="160" cy="160" r="110"/><circle className="core-solid" cx="160" cy="160" r="89"/><circle className="core-dashes" cx="160" cy="160" r="72"/><path className="circuit" d="M0 160H38 M282 160H320 M160 0V14 M160 306V320 M20 60H55L75 80 M245 240L266 262H300"/></svg><div className="core-label"><b>JARVIS</b><span>FINANCE CORE</span></div><div className="core-scan" aria-hidden="true"/></div>
  <div className="telemetry right"><span className="eyebrow">LEDGER ENTRIES</span><strong>{String(transactions).padStart(2,'0')}</strong><p>已記錄交易</p><div className="terminal-log"><span>INPUT → VALIDATE</span><span>UPDATE → SAVE</span><span>LOCAL STORAGE</span></div></div></div>
  <div className="hud-bottom" aria-live="polite">{event?<div className="transaction-scan" key={event.id}><b>{event.kind==='income'?'INCOME LOGGED':'EXPENSE LOGGED'}</b><span>{event.kind==='income'?'+':'−'}{money(event.cents)}</span><span>{money(event.before)} → {money(event.after)}</span></div>:<span>READY FOR INPUT / 等待交易輸入</span>}</div>
 </section>;
}
