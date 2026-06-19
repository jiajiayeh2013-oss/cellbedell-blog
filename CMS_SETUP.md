# Cellbedell Blog 發文後台設定

網站已加入 Decap CMS 後台骨架。

後台網址：

https://cellbedell-blog.netlify.app/admin/

## 後台可以做什麼

- 新增文章
- 編輯文章草稿
- 選擇文章系列
- 上傳主圖
- 填寫圖片來源與參考來源
- 使用 editorial workflow 管理草稿、審核與發布

## 還需要完成的 Netlify 設定

目前本機資料夾還不是 Git repository。Decap CMS 要真正可用，需要完成：

1. 將此專案推到 GitHub repository。
2. 在 Netlify 將 `cellbedell-blog` 改成連接該 GitHub repository。
3. 在 Netlify 啟用 Identity。
4. 在 Netlify 啟用 Git Gateway。
5. 邀請管理者 email。
6. 管理者進入 `/admin/` 設定密碼後登入。

## 重要限制

Decap CMS 會把文章存成 `content/posts/*.md`。目前網站仍以既有 HTML 頁面為主，下一步需要新增 build script，將 Markdown 文章自動轉成 `posts/*.html`，並更新首頁與系列頁。

## 建議下一步

先完成 GitHub + Netlify Identity / Git Gateway。完成後再加入自動產生文章頁的 build script，讓後台按下發布後，Netlify 自動部署正式文章。
