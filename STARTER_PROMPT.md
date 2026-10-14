# 第三課 JARVIS Starter Prompt

老師課前使用。包內已包含可運行starter；此prompt用於重新生成。

你是中學生AI創作課程的coding助教。為第三課建立「JARVIS零用錢控制器」starter。
沿用React/TypeScript、VS Code/Copilot、npm install、npm run dev。先檢查現有框架；不可覆蓋第二課時間表。空資料夾使用本包React/Vite + Express server結構。
設計方向：深黑藍底、細線電路、發光同心圓HUD、克制動畫、清晰數據。介面成熟；不用卡通角色、金幣、火箭、貼紙、排行榜或兒童語氣。使用CSS/SVG畫介面，無外部圖像依賴。標題JARVIS零用錢控制器，繁體中文＋簡短英文。
Starter即有旋轉HUD core、餘額、收入/支出表單、交易表格、CSS交易確認掃描。記錄支出50時顯示EXPENSE LOGGED、-$50及$100→$50；收入顯示INCOME LOGGED。修改/刪除/刷新不假裝新交易。支援prefers-reduced-motion。
加入ThemeControls.tsx：青藍、紫、橙、綠preset，自訂type=color，localStorage保存，CSS --accent統一變色。文字與警告保持可讀，不把主色當作必需/想要分類或收入/支出唯一識別。
Transaction:{id,date,item,kind:income|expense,cents整數,category}。首次今日收入100；可新增/查看/修改/刪除；拒絕空項目、0、負数、多於兩位小數、非法數字、任何導致總餘額負數的改動。localStorage保留帳目，不要求登入/銀行/Supabase。
初始畫面沒有完成的圖表、目標、AI顧問。Charts/Goal/Advisor組件return null，已在App wiring，保留TODO(STUDENT-CHART/GOAL/AI)。不要直接完成後續任務。
money.ts提供parseCents/balance/categoryTotals/periodRows；整數cents計算，图表換算元；週一至日/所選月篩選。Recharts/react-is與GenAI SDK預先列dependencies。
server-side POST /api/classify老師預備；.env的AI_MODE=mock預設固定示範，必須顯示未連接AI；live用GEMINI_API_KEY/GEMINI_MODEL，key不可在browser/VITE_/Git。只傳所選expense的item/cents/context。
AI分類need/want/unsure，回傳reason/question/alternative及mode，client/server驗證；有loading/error/timeout/retry。資訊不足追問，學生可保留自己的分類與反思，不聲稱完全客觀，不強制接受，不改帳目。
生成完整檔案、README、.env.example、啟動流程、測試與build。檢查npm run build及npm test。
