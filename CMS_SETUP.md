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
- 管理系列排程看板
- 查看文章點閱統計
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

1. 讀取 `content/posts/*.md` 中狀態為 `Published` 且發布時間已到的文章。
2. 產生對應的 `posts/*.html` 靜態文章頁。
3. 更新首頁最新文章區塊。
4. 更新 VivaTech 2026 系列頁文章列表。

第一篇 VivaTech 2026 總覽文已經有完整手工設計 HTML，因此目前保留原頁面，不用簡短 Markdown 內容覆蓋。之後從後台新增的完整文章會自動產生 HTML。

## 建議下一步

在後台新增一篇測試草稿，確認「儲存草稿 -> Ready -> Published + 發布時間已到 -> Netlify 自動部署 -> 前台出現文章」的完整流程。

## 系列排程看板

後台已新增「系列排程」collection，資料會存放在 `content/schedule/*.md`。

建議使用方式：

1. 先在「系列排程」新增主題，填入系列、預計發布時間、負責人、語系、摘要與備註。
2. 寫作開始後，將排程狀態改成 `Drafting` 或 `Review`。
3. 文章建立後，將排程項目的「對應文章 Slug」填入文章網址 slug。
4. 文章確認可發後，把文章本身設為 `Published`，並填入「排程發布時間」。
5. 發布時間到達後，下一次 Netlify build 會把文章放到首頁、系列頁、sitemap 與 newsletter feed。

注意：`Ready` 只代表文章已準備好，不會公開到前台。真正公開條件是 `status: Published` 且發布時間已到。

## 點閱統計

後台統計頁：

https://cellbedell-blog.netlify.app/admin/analytics.html

目前統計採頁面瀏覽量，不使用 cookie，不辨識唯一訪客。系統會記錄：

- 每篇文章總點閱
- 今日點閱
- 近 7 日點閱
- 近 30 日點閱
- 系列排行

統計資料由 Netlify Function 寫入 Netlify Blobs。需要確認 `package.json` 中的 `@netlify/blobs` 已在 Netlify build 時安裝。

## 協作者登入與權限

目前後台沿用 Netlify Identity + Git Gateway，不另外建立自訂帳密系統。

建議 Netlify 設定：

1. 到 Netlify Site settings -> Identity。
2. 將 Registration 設為 Invite only，關閉公開註冊。
3. 到 Identity -> Users 邀請新的協作者 email。
4. 協作者收到邀請信後設定密碼，再進入 `/admin/` 登入。
5. 若要移除協作者，到 Identity -> Users 刪除或停用該帳號。

協作者工作流：

1. 協作者可新增系列排程與文章草稿。
2. 草稿完成後改為 `Review` 或 `Ready`。
3. 管理者確認內容後，將文章改為 `Published` 並設定排程發布時間。
4. 若需要撤下文章，將狀態改為 `Archived` 或改回 `Drafting`，重新部署後前台會移除該 CMS 文章頁。
