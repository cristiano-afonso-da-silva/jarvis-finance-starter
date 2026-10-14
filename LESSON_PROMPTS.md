# 課堂分段 Prompts

一次一段，完成後測試及保存版本。

## 主題個人化
只修改介面設定與名稱，不改財務邏輯。讓控制器名稱為［名稱］。查看ThemeControls.tsx與style.css，解釋color state → CSS --accent → HUD/按鈕的關係。保留4個preset、自訂色與localStorage。替換一個preset為［#HEX］並同步文字標籤；reload後保留選色。檢查文字/警告可讀、mobile不溢出，交易表/餘額不改動。先指出檔案和計劃，再給最小patch及3個測試。

## 圖表
請只完成 src/components/Charts.tsx 的 TODO(STUDENT-CHART)，保留 App 與HUD及交易確認動畫。
使用已安裝 Recharts，先做 bar chart。props rows 是唯一資料來源；用 money.ts 的 periodRows(rows, referenceDate, mode) 篩選，預設本週，週一至週日；加入 week/month 選擇及日期輸入。categoryTotals 統計分類支出，排除 income，amount 單位元。
使用 ResponsiveContainer，外層 height:300px；加入分類軸、金額軸、Tooltip、文字摘要及無支出 empty state。新增、修改、刪除後即時更新，不保存另一份總額。
先說 Input → Process → Output，再修改；用收入100、午餐30、玩具20測試：只有飲食30、娛樂20，支出總額50。npm run build；不做目標或AI。
圖表主色使用CSS var(--accent)，文字仍清楚；不要使用太空、卡通或兒童語氣。

## 選做 圓形圖
只在 Charts.tsx 加 bar/pie 切換，兩圖用同一份分類支出資料。Pie 用 PieChart/Pie/Cell/Legend，顯示分類和金額。無支出顯示文字，不畫零值圓形圖。用飲食30、娛樂20驗證60%和40%。不改表單。

## 儲蓄目標
請只完成 src/components/Goal.tsx 的 TODO(STUDENT-GOAL)，保留記帳與圖表。
新增學生可改的任務名稱、目標金額（預設30元）、week/month 選擇、參考日期、進度條、TARGET ACHIEVED HUD狀態提示。用 periodRows 和 balance 計算所選期間淨儲蓄＝收入－支出；不把總錢包餘額當本週儲蓄，不另扣已儲錢。
百分比限制0–100%，文字顯示真實淨額和差額；目標須>0。目標名稱與cents存localStorage。從未達標→達標才播一次簡短動畫，刷新不重播獎勵；尊重 prefers-reduced-motion。語氣成熟，不羞辱或鼓勵花費。
測試：本週收入100、支出50、目標30：淨儲50、100%、達標；目標80：62.5%、還差30；上週收入不算本週。npm run build；不做AI。

## 消費判斷模組
請只完成 src/components/Advisor.tsx 的 TODO(STUDENT-AI)，保留 server.mjs API。
學生從 rows 選一筆 expense，填用途和已有替代品 context（最多500字），先選自己的 need/want/unsure，再要求分析。POST /api/classify，body {item,cents,context}。不傳整份帳目、姓名、學校或key。
顯示 loading、防重複按、20秒timeout、error及重試；驗證 JSON label/reason/question/alternative/mode。mode:mock 標「示範模式，固定回覆，未連接AI」；mode:live 才標真正AI回覆，失敗不可靜默改mock。切換支出／修改context要清除舊結果，分析中鎖輸入，避免錯配回覆。
展示理由、追問及替代選擇；讓學生保存自己最後分類和「我同意／不同意，因為…」至localStorage，以transaction id為鍵。與AI建議分開，不改帳目或強制接受。无支出有empty state。mock能測UI，不能測模型判斷。npm run build。
