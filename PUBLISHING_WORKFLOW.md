# Cellbedell Blog 每日發文流程

每日發文採「草稿確認後部署」。任何文章都先整理來源與草稿，經使用者確認後才更新網站與部署。

內容後台：

https://docs.google.com/spreadsheets/d/1f5pOv6S8H-cJ1IWsq2kOU4dqJnqvDfWq8m5a_IDuIYg

## 每日 10:00 工作節奏

已設定 automation `vivatech-2026`，每天台灣時間上午 `10:00` 喚醒此 thread。

提醒啟動後依序處理：

1. 確認今日系列與主題，VivaTech 2026 優先。
2. 整理 3 到 5 個可靠來源。
3. 找 1 到 3 張可用圖片，記錄圖片來源與連結。
4. 將文章狀態、來源與圖片資料填入 Google Sheets 內容後台。
5. 產出文章大綱。
6. 產出繁體中文草稿。
7. 使用者確認草稿、圖片與來源。
8. 新增或更新文章頁。
9. 同步更新首頁最新文章區與系列頁。
10. 執行 `npm run check:links`。
11. 部署到 Netlify。
12. 檢查線上首頁、系列頁、最新文章頁。
13. 回到 Google Sheets，將文章狀態改為 `Published`。

## 每篇文章固定內容

- 主標題
- 副標或導言
- 發布日期
- 作者
- 系列名稱
- Tags
- 主圖與圖片來源
- 正文 3 到 5 個段落
- 台灣讀者或生活場景觀察
- 參考來源
- 下一篇可延伸方向

## VivaTech 2026 排程

- `2026-06-19`：系列首篇總覽文已完成。
- `2026-06-20`：展會最後一天觀察，聚焦 AI、法國新創與展後值得追的生活科技。

## 部署原則

- 主要部署平台：Netlify。
- Build command 留空。
- Publish directory 使用 `.`。
- 不引入 CMS、Astro、Next.js 或資料庫。
- 圖片放在 `assets/`，文章放在 `posts/`。
