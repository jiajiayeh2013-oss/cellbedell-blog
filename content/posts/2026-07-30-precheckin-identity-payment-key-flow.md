---
status: Published
locale: zh-Hant
translation_key: 2026-07-30-precheckin-identity-payment-key-flow
date: 2026-07-30
scheduled_publish_at: 2026-07-30T09:00:00+08:00
owner: ""
series_order: 13
series: 旅館生活科技
title: Pre Check-in 不只是填表：身份、付款與房卡權限要怎麼先整理好？
seo_title: Pre Check-in 不只是填表：旅宿入住前如何整理身份、付款與房卡權限
seo_description: Pre check-in 的價值不是讓旅客少填一次表，而是把身份、付款、房號與門禁權限先整理好，讓現場 Kiosk 與櫃台只處理驗證與執行。
subtitle: 抵達前整理資料，抵達時只處理確認與發卡，智慧入住才會真的變順。
author: Cellbedell
tags:
  - 旅館生活科技
  - Pre Check-in
  - PMS API
  - 自助入住
  - 房卡權限
hero_image: /assets/2026-07-30-precheckin-identity-payment-key-flow.png
hero_image_alt: 飯店櫃台上有 pre check-in 手機畫面、付款機、證件與正在寫入的房卡
hero_image_credit: Cellbedell / AI 生成概念圖
summary: Pre check-in 應該把旅客資料、付款授權、身份確認、房號分配與房卡權限先整理好，讓現場報到從資料輸入變成驗證與執行。
next_direction: Kiosk 任務執行點, PMS 權限資料下放, 智慧入住例外流程
sources:
  - title: WSJ / EQT Bets on AI Transformation With Hospitality Software Investment
    url: https://www.wsj.com/articles/eqt-bets-on-ai-transformation-with-hospitality-software-investment-92bd4184
  - title: Mews / Connector API
    url: https://docs.mews.com/open-api
  - title: Cloudbeds / Developers
    url: https://developers.cloudbeds.com
  - title: Oracle Hospitality / OPERA Cloud Property Management
    url: https://www.oracle.com/hospitality/products/opera-cloud-property-management/
  - title: Interactive kiosk / Hotel kiosk use overview
    url: https://en.wikipedia.org/wiki/Interactive_kiosk
---

Pre check-in 常被想成「讓旅客提早填表」。但對旅宿營運來說，它真正的價值不只是少一次資料輸入，而是把入住前後最容易卡住的幾個任務先整理好：身份、付款、房號、房卡權限與例外狀況。

如果這些資料在旅客抵達前就被確認，現場報到就可以從「重新蒐集資料」變成「驗證與執行」。這才是智慧入住能不能減壓的差別。

## 抵達前要先整理什麼？

一個有用的 pre check-in 流程，至少要確認訂單、入住人資料、抵達時間、付款或預授權狀態、證件需求、房型與特殊需求。更進一步，系統還可以先判斷是否能分配房號、是否能準備房卡權限，以及是否需要人工審核。

這些資料不必全部在旅客手機上完成，但必須在後台形成清楚狀態。旅客抵達時，Kiosk 或櫃台不應該再從零開始問同一批問題。

## PMS 是流程的主幹

Mews、Cloudbeds、Oracle Hospitality 這類 PMS 與旅宿平台之所以重要，是因為它們承載了訂單、房況、房價、付款、房客與營運紀錄。Pre check-in 如果沒有接回 PMS，很容易變成孤立表單。

真正有價值的流程，是手機或網頁完成資料後，把狀態回寫 PMS，再讓 Kiosk、發卡機、門禁設備或櫃台介面使用同一筆資料。這樣現場人員看到的不是「客人有填一張表」，而是「這筆入住已完成哪些條件，還缺哪一步」。

WSJ 對 Mews AI 投資的報導也指出，旅宿科技正在把訂房、入住、付款和服務從交易資料轉成更完整的營運體驗。Pre check-in 正是這個轉變的前段入口。

## 哪些任務仍然要留到現場？

Pre check-in 不代表所有事情都要在抵達前完成。證件複核、例外付款、同行人變更、房型升等、特殊需求、押金爭議，這些仍然需要現場處理。

好的設計不是假裝沒有例外，而是把例外清楚標示出來。旅客可以快速通過已確認的步驟，櫃台則專心處理需要人判斷的部分。

這也是 Kiosk 的角色：它不是螢幕版櫃台，而是把已經完成資料整理的入住任務執行出來，例如身份確認、簽名、發卡、列印收據或引導到人工櫃台。

## Pre check-in 最後是為了讓現場更輕

旅客感受到的智慧入住，通常不是「我填了多少表」，而是抵達時有沒有少等、少講、少重複。櫃台感受到的智慧入住，也不是多一套系統，而是尖峰時間少一點混亂。

因此 Pre check-in 的設計要從現場回推：哪些資料如果抵達前整理好，能讓發卡更快？哪些狀態如果已經確認，能讓門禁權限更安全？哪些例外如果提前浮出，能讓人員先準備？

填表只是表面。真正的 Pre check-in，是把旅客抵達前後的資料、付款和權限接成一條可以執行的入住線。
