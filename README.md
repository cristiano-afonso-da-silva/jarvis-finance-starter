# JARVIS 零用錢控制器 · 第三課 Starter
這是教學用 starter，初始只顯示旋轉HUD、交易確認掃描及可自選主色、餘額、交易表單、表格。記帳CRUD/localStorage已完成；圖表、目標、AI UI留作課堂任務。
## 啟動（Windows）
解壓到 AI Course/My Money Manager/jarvis-finance-starter。VS Code → File → Open Folder，選有 package.json 的那層。
沿用已有Node.js；Vite7要求Node20.19+或22.12+，本包用Node24驗證。Terminal逐行：
```
npm install
npm run dev
```
開 http://localhost:5173；Ctrl+C停止。npm run build檢查編譯；npm test檢查財務計算。
GitHub流程：老師課前建立獨立repository，學生Fork→Clone。不要覆蓋第二課智能時間表。
首次有今日收入$100。Log transaction是記帳，不是Login。$是統一課堂示例；若改MOP/HKD，只改顯示，不做外匯。
## 次序
STARTER_PROMPT.md：老師生成模板用。
LESSON_PROMPTS.md：學生逐段貼Copilot，Charts→Goal→Advisor。
teacher/：老師救援參考；將單個檔案內容複製到 src/components 的同名檔案。先做再看，不一次完成全部。
Recharts/GenAI SDK已預先列入dependencies，課前安裝。src/money.ts以cents計算；server.mjs提供老師預備API基建。
## 真正AI（老師課前）
複製.env.example→.env，預設AI_MODE=mock。
要真正連線：AI_MODE=live；填GEMINI_API_KEY；GEMINI_MODEL填老師Google AI Studio帳戶可用模型名稱；重啟npm run dev。
key只在server；不要放browser、VITE_變數、Git或截圖。學生無需建立AI帳戶，老師按適用帳戶要求示範。只用虛構資料。
mock固定回覆不是模型。live需要key、有效模型、額度及網絡；未使用使用者私有key實測live。本地教學server只綁localhost，無公開部署、登入或付款。
## 保存與恢復
localStorage只屬同一browser/localhost，非跨電腦同步。Git不保存帳目。不要清browser資料來除錯；重新示範可用無痕視窗，關閉後不保留。
備份專案勿包含.env或node_modules；每階段用Git保存程式。課前安裝dependencies，課堂網絡差可用mock。
## 官方資料
https://github.com/recharts/recharts
https://googleapis.github.io/js-genai/
https://ai.google.dev/gemini-api/docs/generate-content/structured-output

## V2 介面
參考futuristic HUD語言：同心圓、電路、狀態列。主色有4個preset及自訂色，保存在jarvis-accent。使用原space-bank-v1帳目key保留舊版同browser資料。
控制器動畫不是AI回覆；真AI只在Advisor live連線成功時標LIVE。此為課堂自製介面，不含任何官方角色資產。
