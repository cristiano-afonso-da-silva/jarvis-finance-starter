export type Kind = 'income' | 'expense';
export type Judgment = 'need' | 'want' | 'unsure';
export type Transaction = { id:string; date:string; item:string; kind:Kind; cents:number; category:string };
export type Analysis = { label:Judgment; reason:string; question:string; alternative:string; mode:'mock'|'live' };
