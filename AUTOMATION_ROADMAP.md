# Cellbedell Blog 自動發文與 Slack 遠端工作路線

本文件定義 Cellbedell Blog 要達成的兩個目標：

1. 每天自動產生一篇可審稿的文章草稿。
2. 出差或移動中，可以直接透過 Slack 與 Codex/AI 助手對話，完成選題、草稿、確認與發文。

## 目前狀態

目前 repo 已具備：

- 靜態網站與多系列頁面。
- Markdown 內容來源：`content/posts/`。
- HTML 產生腳本：`npm run build`。
- 連結檢查腳本：`npm run check:links`。
- Google Sheets 內容後台規劃。
- Slack 收件流程文件：`SLACK_WORKFLOW.md`。
- 每日 10:00 喚醒此 Codex thread 的提醒流程。

目前還沒有常駐後端服務，因此「自動產生」仍依賴 Codex thread 被喚醒後執行，不是完全離線自動化。

## 目標體驗

### 每日自動草稿

每天固定時間系統自動完成：

1. 根據內容後台或預設系列選擇今日題目。
2. 搜尋並整理 3 到 5 個可靠來源。
3. 產出繁體中文大綱與文章草稿。
4. 寫入 Google Sheets 或建立 Markdown 草稿。
5. 在 Slack 發送摘要、來源與確認按鈕。

預設不直接發布。只有收到明確確認後，才更新網站並部署。

### Slack 遠端發文

你可以在 Slack 傳：

```text
今天寫旅館生活科技，主題是 AI concierge，幫我找資料並產草稿
```

或：

```text
這個連結很適合寫成 AI 與人文，先幫我整理成明天文章
```

系統應回覆：

- 建議標題
- 系列
- 文章摘要
- 來源清單
- 草稿連結或草稿全文
- 下一步選項：`修改`、`排程`、`發布`

## 建議架構

### 第一階段：半自動，最穩

保留目前 Codex thread 作為主要執行環境：

- 每天 10:00 喚醒 thread。
- Codex 產生草稿。
- 使用者在 thread 或 Slack 確認。
- 確認後由 Codex 更新 repo、跑檢查、部署。

適合現在立刻使用，風險最低。

### 第二階段：Slack 成為正式入口

增加一個 Slack bot 或 webhook worker：

- Slack channel：`#blog-inbox`、`#blog-drafts`、`#blog-publish`。
- Worker 接收 Slack 訊息與附件。
- Worker 將素材寫入 Google Sheets 或 repo 草稿。
- Worker 呼叫 AI 產生草稿。
- Worker 將草稿回覆到 Slack。

這一階段可以讓你不需要遠端連回本機，也能把外出靈感變成草稿。

目前第一版 endpoint 已建立在：

```text
netlify/functions/slack-blog.js
```

部署與 Slack App 設定見 `SLACK_BOT_SETUP.md`。

### 第三階段：完整自動發文系統

增加排程 worker：

- 每日自動建立草稿。
- 自動檢查來源。
- 自動建立 Markdown。
- 自動建立 pull request 或 commit。
- 你在 Slack 按確認後才 merge/deploy。

發布仍建議保留人工確認，避免錯誤引用、圖片授權問題或語氣偏離品牌。

## Slack 指令草案

第一版可以支援自然語言，不需要很嚴格。但內部可整理成以下指令：

```text
/blog idea [文字或連結]
/blog draft [系列] [主題]
/blog sources [主題]
/blog revise [草稿 ID] [修改方向]
/blog publish [草稿 ID]
/blog schedule [草稿 ID] [日期]
```

## 狀態流

文章狀態建議維持：

- `Idea`：靈感或素材。
- `Drafting`：正在整理來源與大綱。
- `Review`：草稿已完成，等你確認。
- `Ready`：你已確認，可準備發布。
- `Published`：已上線。
- `Archived`：暫不處理。

Slack 訊息、Google Sheets 與 repo 內容都應對齊這個狀態。

## 發布安全規則

以下動作需要明確確認：

- 發布到正式網站。
- 使用外部圖片。
- 引用具爭議或時效性新聞。
- 改動首頁主視覺或系列定位。
- 刪除或覆蓋既有文章。

以下動作可以自動執行：

- 收集 Slack 素材。
- 建立草稿。
- 整理來源候選清單。
- 更新 Google Sheets 的 `Idea` 或 `Drafting` 狀態。
- 在 Slack 發送草稿摘要。

## 推薦下一步

短期先做：

1. 確認 Slack channel：`#blog-inbox`、`#blog-drafts`、`#blog-publish`。
2. 讓每日 10:00 流程固定產生一篇 `Review` 狀態草稿。
3. 所有外出靈感先進 `#blog-inbox`。
4. 確認後再由 Codex 更新網站並部署。

中期再做：

1. 建立 Slack bot 或 webhook endpoint。
2. 把 Slack 訊息自動同步到 Google Sheets。
3. 新增「由 Slack 觸發草稿」的 worker。
4. 新增「Slack 確認後發布」流程。

長期再做：

1. 每日排程 worker 自動產生草稿。
2. GitHub PR 作為發文審核層。
3. Netlify 由 GitHub merge 自動部署。
