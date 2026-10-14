import {useEffect,useState} from 'react';
const presets=[['青藍 Cyan','#56dcff'],['紫 Violet','#b896ff'],['橙 Amber','#ffbd66'],['綠 Emerald','#7ce8b0']];
function initial(){try{const s=localStorage.getItem('jarvis-accent');if(s&&/^#[0-9a-f]{6}$/i.test(s))return s;}catch{}return '#56dcff';}
export default function ThemeControls(){
 const [color,setColor]=useState(initial),[warning,setWarning]=useState('');
 useEffect(()=>{document.documentElement.style.setProperty('--accent',color);try{localStorage.setItem('jarvis-accent',color);}catch{setWarning('配色無法保存。');}},[color]);
 return <section className="theme-controls" aria-label="介面配色"><span className="eyebrow">INTERFACE ACCENT</span><div className="swatches">{presets.map(([name,hex])=><button type="button" key={hex} className={'swatch '+(color.toLowerCase()===hex?'selected':'')} style={{background:hex}} aria-label={name} aria-pressed={color.toLowerCase()===hex} title={name} onClick={()=>setColor(hex)}/>)}<label className="custom-color">自訂色<input type="color" value={color} onChange={e=>setColor(e.target.value)} aria-label="自訂介面主色"/></label></div><p className="error" role="alert">{warning}</p></section>;
}
