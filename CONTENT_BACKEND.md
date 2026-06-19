# Cellbedell Blog 內容後台

Cellbedell Blog 目前有兩層管理方式：

1. Google Sheets：內容規劃、狀態追蹤、來源管理。
2. Decap CMS：正式發文後台，路徑為 `/admin/`。

Google Sheets 適合先收集點子與安排每日發文；Decap CMS 適合正式新增文章與發布。

後台連結：

https://docs.google.com/spreadsheets/d/1f5pOv6S8H-cJ1IWsq2kOU4dqJnqvDfWq8m5a_IDuIYg

## 分頁說明

### Posts

管理所有文章與每日發文狀態。

主要欄位：

- `Status`：Idea、Drafting、Review、Ready、Published、Archived
- `Publish Date`：發布日期
- `Series`：文章所屬系列
- `Slug`：文章網址與檔名用代稱
- `Title`：文章標題
- `Subtitle`：副標或導言
- `Author`：作者
- `Tags`：文章標籤
- `Hero Image URL`：主圖路徑或外部圖片連結
- `Hero Image Credit`：圖片來源
- `Summary`：首頁或系列頁摘要
- `Body Draft`：草稿內容或草稿備註
- `Source IDs`：對應 Sources 分頁的來源 ID
- `Next Direction`：下一篇延伸方向
- `Local HTML Path`：本機文章頁路徑
- `Netlify URL`：線上文章連結
- `Notes`：內部備註

### Series

管理系列定位、讀者承諾與系列頁。

### Sources

管理文章來源、圖片來源、引用用途與查核日期。

### Publish Checklist

每次發布前的檢查清單。

## 每日發文流程

1. 在 `Posts` 新增或更新當天文章列。
2. 將 `Status` 設為 `Drafting`。
3. 在 `Sources` 填入 3 到 5 個可靠來源。
4. 產出草稿後，將 `Status` 改為 `Review`。
5. 使用者確認後，將 `Status` 改為 `Ready`。
6. 更新網站 HTML、首頁與系列頁。
7. 跑 `npm run check:links`。
8. 部署到 Netlify。
9. 將 `Status` 改為 `Published`，填入 `Local HTML Path` 與 `Netlify URL`。

## 目前策略

Google Sheets 作為「內容管理後台」，網站仍維持靜態 HTML。這代表 Google Sheets 不會即時自動改網站；每天發布時，依照表格內容產生或更新靜態頁，再部署到 Netlify。
