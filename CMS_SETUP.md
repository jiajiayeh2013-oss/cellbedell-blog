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

## 還需要完成的 Netlify 設定

目前已完成：

1. 本機專案已初始化 Git。
2. 專案已推送到 GitHub：`jiajiayeh2013-oss/cellbedell-blog`。
3. Netlify production site 已連接 GitHub CI/CD。
4. `main` branch push 到 GitHub 後會自動觸發 Netlify 部署。

Decap CMS 要真正可用，仍需要完成：

1. 在 Netlify 啟用 Identity。
2. 在 Netlify 啟用 Git Gateway。
3. 邀請管理者 email。
4. 管理者進入 `/admin/` 設定密碼後登入。

目前 Netlify site 狀態：

- `repo_url` 是 `https://github.com/jiajiayeh2013-oss/cellbedell-blog`。
- production branch 是 `main`。
- 最新 production deploy 已由 GitHub commit 觸發。
- `identity_instance_id` 仍是空值，代表 Netlify Identity 尚未啟用。

## 重要限制

Decap CMS 會把文章存成 `content/posts/*.md`。目前網站仍以既有 HTML 頁面為主，下一步需要新增 build script，將 Markdown 文章自動轉成 `posts/*.html`，並更新首頁與系列頁。

## 建議下一步

先完成 Netlify Identity / Git Gateway。完成後再加入自動產生文章頁的 build script，讓後台按下發布後，Netlify 自動部署正式文章。
