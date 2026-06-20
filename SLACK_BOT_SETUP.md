# Cellbedell Blog Slack Bot 設定

本文件說明如何把 Slack 接到 Netlify Function，讓你在 Slack 裡觸發文章草稿。

## Endpoint

部署到 Netlify 後，Slack endpoint 會是：

```text
https://你的-netlify-domain/.netlify/functions/slack-blog
```

本機或部署前可先用表單格式測試：

```bash
curl -X POST http://localhost:8888/.netlify/functions/slack-blog \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "command=/blog" \
  --data-urlencode "user_name=JJ" \
  --data-urlencode "text=今天寫旅館生活科技，主題是 AI concierge，幫我找資料並產草稿"
```

## Netlify 環境變數

必要：

- `SLACK_SIGNING_SECRET`：Slack App 的 Signing Secret，用來驗證請求來自 Slack。

建議：

- `OPENAI_API_KEY`：用來產生完整草稿。
- `OPENAI_MODEL`：可選，預設 `gpt-4.1-mini`。

如果沒有設定 `OPENAI_API_KEY`，endpoint 仍會回覆一份規則版草稿骨架，方便先測 Slack 流程。

Netlify CLI 設定範例：

```bash
netlify env:set SLACK_SIGNING_SECRET "從 Slack App Basic Information 複製"
netlify env:set OPENAI_API_KEY "你的 OpenAI API key"
netlify env:set OPENAI_MODEL "gpt-4.1-mini"
```

檢查本機環境變數是否齊全：

```bash
npm run check:slack-bot
```

## Slack App 設定

### Slash command

建議先建立 slash command：

```text
/blog
```

Request URL：

```text
https://你的-netlify-domain/.netlify/functions/slack-blog
```

Usage hint：

```text
今天寫旅館生活科技，主題是 AI concierge，幫我找資料並產草稿
```

### Event subscription

如果你希望 bot 也能接一般訊息，可啟用 Event Subscriptions。

Request URL：

```text
https://你的-netlify-domain/.netlify/functions/slack-blog
```

Slack 第一次驗證 URL 時，function 會回傳 challenge。

建議先從 slash command 開始，因為權限最少、行為最清楚。

## 使用範例

```text
/blog 今天寫旅館生活科技，主題是 AI concierge，幫我找資料並產草稿
```

```text
/blog 這個連結適合 AI 與人文，請整理成明天文章，先不要發布 https://example.com
```

```text
/blog 用 VivaTech 今日觀察寫一篇展後回顧，焦點放在 AI、法國新創和生活科技
```

## 發布原則

這一版只產生草稿，不直接改網站或部署。

原因：

- Netlify Function 不能穩定直接寫回 git repo。
- 發布前仍需要確認來源、圖片授權與品牌語氣。
- 下一階段建議接 GitHub API，讓 Slack 確認後自動建立 PR，再由 Netlify 部署。

## 部署

確認工作區內容都可以上線後，部署：

```bash
netlify deploy --prod --dir . --functions netlify/functions
```

如果工作區有未提交或不屬於本次 Slack bot 的變更，先不要直接 production deploy。建議改用 GitHub PR 或先清楚確認這些變更都可以一起上線。
