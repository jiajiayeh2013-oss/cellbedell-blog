# Cellbedell Blog 發文後台設定

網站已加入 Decap CMS 後台骨架，GitHub repository 也已建立。

後台網址：

https://cellbedell-blog.netlify.app/admin/

GitHub repository：

https://github.com/jiajiayeh2013-oss/cellbedell-blog

## 後台可以做什麼

- 新增文章
- 編輯文章草稿
- 選擇文章系列
- 上傳主圖
- 填寫圖片來源與參考來源
- 使用 editorial workflow 管理草稿、審核與發布

## Netlify / GitHub 設定狀態

目前已完成：

1. 本機專案已初始化 Git。
2. 專案已推送到 GitHub：`jiajiayeh2013-oss/cellbedell-blog`。
3. Netlify production site 已連接 GitHub CI/CD。
4. `main` branch push 到 GitHub 後會自動觸發 Netlify 部署。
5. Netlify Identity 已啟用。
6. Git Gateway 已啟用。
7. 管理者邀請已送出。
8. `/admin/` 已可正常載入 Decap CMS 登入畫面。
9. 首頁已載入 Netlify Identity widget，可處理邀請信中的 `invite_token` 並導向 `/admin/`。

目前 Netlify site 狀態：

- `repo_url` 是 `https://github.com/jiajiayeh2013-oss/cellbedell-blog`。
- production branch 是 `main`。
- 最新 production deploy 已由 GitHub commit 觸發。
- `identity_instance_id` 已存在，代表 Netlify Identity 已啟用。

## Markdown 自動產生 HTML

Decap CMS 會把文章存成 `content/posts/*.md`。目前已加入 `scripts/build-site.mjs`，Netlify build 時會執行 `npm run build`，並自動完成：

1. 讀取 `content/posts/*.md` 中狀態為 `Ready` 或 `Published` 的文章。
2. 產生對應的 `posts/*.html` 靜態文章頁。
3. 更新首頁最新文章區塊。
4. 更新 VivaTech 2026 系列頁文章列表。

第一篇 VivaTech 2026 總覽文已經有完整手工設計 HTML，因此目前保留原頁面，不用簡短 Markdown 內容覆蓋。之後從後台新增的完整文章會自動產生 HTML。

## 建議下一步

在後台新增一篇測試草稿，確認「儲存草稿 -> Ready/Published -> Netlify 自動部署 -> 前台出現文章」的完整流程。
