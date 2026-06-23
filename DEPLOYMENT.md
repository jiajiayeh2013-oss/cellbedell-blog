# Cellbedell Blog 部署與上線流程

這個網站是純靜態多頁網站，不需要 build step。部署時把整個資料夾作為網站根目錄即可。

## 主要部署平台：Netlify

目前主要部署平台採 `Netlify`。

第一次上線：

1. 將 `/Users/a123/Desktop/JJ blog` 整個資料夾部署到 Netlify。
2. Build command 留空。
3. Publish directory 使用 `.`。
4. `netlify.toml` 已設定靜態站根目錄與基本 headers。

長期維護建議：

1. 建立 GitHub repository。
2. 將此專案推到 GitHub。
3. 在 Netlify 連接該 repository。
4. 之後每次文章確認後，更新檔案並推送，Netlify 會自動重新部署。

## 每日文章部署節奏

每日發文採「草稿確認後部署」：

1. 先整理 3 到 5 個可靠來源。
2. 找 1 到 3 張可用圖片並記錄來源。
3. 產出選題、大綱與繁體中文草稿。
4. 使用者確認草稿與圖片來源。
5. 新增文章頁，更新首頁與系列頁。
6. 執行上線前檢查。
7. 部署到 Netlify。
8. 檢查線上首頁、系列頁與最新文章頁。

## 訂閱信設定

訂閱表單會呼叫 Netlify Function，並透過 Mailgun 處理通知：

1. 站方新訂閱通知信
2. 讀者歡迎信，需完成 Mailgun 寄件網域驗證後才會寄給外部 email
3. 將讀者加入 Mailgun mailing list
4. 每週一台灣時間上午 9:00 由 Netlify Scheduled Function 寄出週報

目前對外設定的 Newsletter 頻率是「每週一封」。週報內容由 `npm run build` 產生的 `newsletter.json` 提供，預設收錄最新 5 篇已發布文章。

Netlify 需要設定以下環境變數：

- `MAILGUN_API_KEY`：Mailgun API key
- `MAILGUN_DOMAIN`：Mailgun 已驗證的寄件網域，例如 `mg.cellbedell.com`
- `MAILGUN_API_BASE_URL`：選填，預設 `https://api.mailgun.net`；若使用 EU 區域可改成 `https://api.eu.mailgun.net`
- `NEWSLETTER_FROM`：寄件人，例如 `Cellbedell Blog <hello@your-domain.com>`
- `NEWSLETTER_NOTIFY_TO`：站方通知收件信箱
- `NEWSLETTER_LIST_ADDRESS`：選填，Mailgun mailing list 地址；未設定時預設使用 `weekly@MAILGUN_DOMAIN`
- `SITE_URL`：選填，週報 function 讀取 `newsletter.json` 的站台網址；預設 `https://cellbedell-blog.netlify.app`

若尚未設定環境變數，訂閱表單會顯示設定提醒，不會假裝寄信成功。

注意：`NEWSLETTER_FROM` 需要使用 Mailgun 已驗證網域底下的寄件地址，例如 `info@mg.cellbedell.com` 或你在 Mailgun 設定裡允許的自訂寄件人；否則 Mailgun 會拒絕寄送。

週報排程設定在 `netlify.toml`：

```toml
[functions."weekly-newsletter"]
  schedule = "0 1 * * 1"
```

這個 cron 是 UTC 時間，每週一 01:00 UTC，等於台灣時間每週一 09:00。

## 本機預覽與訂閱測試

不要用 `python -m http.server` 或其他純靜態伺服器測試訂閱表單，因為它們不支援 `POST /.netlify/functions/newsletter`，會回傳 `501 Unsupported method ('POST')`。

本機請改用：

```bash
npm start
```

然後開啟 `http://localhost:8888`。這個預覽伺服器會同時提供靜態頁面與 `/.netlify/functions/newsletter`，行為會比較接近 Netlify。

## 上線前檢查

- 首頁：`index.html`
- VivaTech 系列頁：`series-vivatech-2026.html`
- 第一篇文章：`posts/2026-06-19-vivatech-2026-highlights.html`
- 圖片資料夾：`assets/`
- 共用樣式：`styles.css`

檢查指令：

```bash
npm run check:links
```

每次新增文章後，記得同步更新：

1. `index.html`
2. `series-vivatech-2026.html`
3. 新文章頁
4. 圖片來源與參考來源

## 備用部署方式

`Vercel` 與 `GitHub Pages` 仍保留為備用方案，但目前不作為主要流程。若改用 Vercel，使用 `vercel.json`；若改用 GitHub Pages，使用 `.nojekyll`。
