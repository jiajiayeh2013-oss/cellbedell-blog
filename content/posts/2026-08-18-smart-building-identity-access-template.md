---
status: Published
locale: zh-Hant
translation_key: 2026-08-18-smart-building-identity-access-template
date: 2026-08-18
scheduled_publish_at: 2026-08-18T10:00:00+08:00
owner: ""
series_order: 23
series: 旅館生活科技
title: 從訪客到員工：智慧建築的身份權限模板怎麼設計？
seo_title: 智慧建築身份權限模板怎麼設計？員工、訪客、廠商與會員門禁規則
seo_description: 智慧建築門禁不是只有能不能進，而是要依員工、訪客、廠商、會員與活動來賓設計不同身份權限模板，管理時間、樓層、區域、審核、撤回與稽核紀錄。
subtitle: 門禁不是只有能不能進，而是誰、何時、能去哪裡，以及什麼時候必須失效。
author: Cellbedell
tags:
  - 旅館生活科技
  - 智慧建築
  - 門禁權限
  - 訪客管理
  - Wallet
  - 身份權限
hero_image: /assets/2026-08-18-smart-building-identity-access-template.svg
hero_image_alt: 智慧建築身份權限模板矩陣，將員工、訪客、廠商、會員與活動工作人員對應到不同空間權限
hero_image_credit: Cellbedell / 智慧建築身份權限模板概念圖
summary: 智慧建築的門禁設計不能把所有人都當成同一種通行者。員工、訪客、廠商、會員與活動來賓需要不同的時間、區域、樓層、審核與撤回規則，才能讓 Wallet、QR Code、NFC 卡與 Kiosk 真正變成可管理的服務入口。
next_direction: 智慧建築斷網備援, 會員 Wallet 與商辦 CRM, 智慧建築導入成本拆解
sources:
  - title: BOMA BEST Field Guide / S1.2 Access Control
    url: https://bomabestfieldguide.org/smart-buildings/s1-2-access-control/
  - title: HID / Visitor Management
    url: https://www.hidglobal.com/solutions/visitor-management
  - title: HID / Employee Badge in Apple Wallet
    url: https://www.hidglobal.com/solutions/employee-badge-apple-wallet
  - title: Johnson Controls / OpenBlue Visitor
    url: https://openblue.johnsoncontrols.com/workplace-experience-and-productivity/visitor
  - title: Apple Support / Add an employee badge to Apple Wallet
    url: https://support.apple.com/en-us/119901
---

## 快速答案

智慧建築的身份權限模板，是把不同通行者先分清楚，再設定對應的時間、樓層、區域、審核與撤回規則。員工、訪客、廠商、會員與活動來賓不應共用同一套「可以開門」邏輯；他們應該各自有不同的有效期限、可通行範圍與稽核要求。

這件事會變得越來越重要，因為建築入口不再只有一張實體門禁卡。現在可能同時存在 Wallet employee badge、QR Code 訪客證、NFC 卡、Kiosk 報到、手機憑證、活動票券與會員 pass。介面變多，如果背後沒有清楚的身份模板，管理只會更混亂。

比較成熟的做法，是把 Wallet、QR Code、NFC 卡、Kiosk、門禁讀頭與電梯控制都接回同一套身份權限層。前端可以多種並行，但後台一定要知道：這個人是誰、何時有效、能去哪裡、誰核准、什麼時候失效、是否留下紀錄。

## 智慧建築不能把所有人都當成同一種通行者

傳統門禁很容易把問題簡化成「有卡就能進」。但智慧建築裡的人不只一種：固定員工、短期訪客、維修廠商、共享空間會員、活動工作人員、租戶管理者、清潔人員與臨時外包，都可能需要進入同一棟建築。

如果所有人都被當成同一種通行者，風險會很快出現。訪客可能拿到過大的樓層權限，廠商施工結束後權限沒有收回，活動工作人員可進後台卻沒有時間限制，會員 pass 到期後仍能進入共享區域。

BOMA BEST 的 access control 指標提到 mobile credentials、temporary access、selective floor access 與權限到期。這些不是單純功能清單，而是智慧建築必須先建立身份分類的原因。

## 員工權限：長期有效，但要依角色與樓層分層

員工通常是最穩定的通行者，但不代表權限可以無限制。不同部門、職務、工作地點、樓層與限制區域，都應該對應不同權限模板。

例如一般員工可進大廳、辦公樓層與茶水間；主管可能多一層會議區；IT 或機電人員可能有設備區權限；但機房、財務室、倉庫或特殊實驗室仍應有更嚴格條件。

HID 的 Employee Badge in Apple Wallet 與 Apple Support 的員工證說明都顯示，手機可以成為辦公空間的通行介面。對管理者來說，重點不是員工用手機還是卡片，而是員工身份變動時，權限能不能同步更新與撤回。

## 訪客權限：短時間、指定地點、接待人綁定

訪客權限應該是短時間、低範圍、可追蹤。訪客不是「可以進大樓的人」，而是「在某個時間，為了某個目的，由某位接待人邀請，前往某個指定空間的人」。

比較好的訪客模板，至少要包含訪客姓名、公司、拜訪時間、接待人、會議室或樓層、有效期限與離場失效。若使用 QR Code、Wallet pass 或 Kiosk 報到，這些欄位也應該回到同一筆訪客紀錄。

Johnson Controls 的 OpenBlue Visitor 將預登記、自助報到、badge、host notification 與 access control integration 放在同一個流程裡。這代表訪客管理不只是前台登記，而是從到訪前就開始建立一條可授權、可通知、可撤回的任務線。

## 廠商與維修人員：最需要審核與稽核

廠商和維修人員是最容易被低估的身份類型。因為他們不是每天進出，但有時需要進入後勤、設備區、機房、電梯機房或停車場等敏感空間。這些區域不能只用一般訪客規則處理。

廠商模板應該更重視審核與紀錄。系統要知道是哪一家廠商、誰負責、要處理什麼任務、可進哪些區域、有效時間多長、是否需要陪同、完成後如何撤權。

如果 AI Agent 介入，Agent 不應直接幫廠商開通機房，而是整理任務、檢查資料、送出核准、提醒到期，並把每一次通行和撤權留下紀錄。這樣才能把便利性和安全性分開處理。

## 會員與活動來賓：通行也可以是服務體驗

會員和活動來賓的通行，不只是安全管理，也可能是服務體驗的一部分。共享辦公、健身空間、品牌活動、展演場館、VIP 區域或會員 lounge，都可以透過 Wallet pass、QR Code 或 NFC 憑證管理入場。

會員模板通常會和方案、等級、訂閱狀態、活動資格或使用時段有關。活動來賓則可能和票券、場次、區域、後台工作權限或 VIP 身份有關。

這裡的機會在於 CRM。當通行憑證和會員資料連在一起，系統不只知道「這個人有沒有進門」，也能知道他參加過什麼活動、使用過哪些空間、是否符合下次邀請或升級條件。通行就不只是開門，而是服務關係的一部分。

## Cellbedell 的切入點：把身份模板接到多種憑證與現場設備

Cellbedell 若要從旅宿走向智慧建築，應該強調的不只是支援 Wallet、QR Code、NFC 卡或 Kiosk，而是能把這些入口接到同一套身份權限模板。

在旅宿裡，身份模板可能是訂房旅客、同行旅客、清潔人員、維修人員與訪客。換到商辦與場館，模板會變成員工、訪客、廠商、會員與活動工作人員。場景不同，但邏輯一致：身份先被定義，權限才被發放。

這也是 AI Agent 和任務層能發揮價值的地方。使用者可以用自然語言提出需求，例如「明天上午讓水電廠商進 B1 設備間兩小時」，Agent 將需求整理成身份、時間、區域、審核與撤回條件，再由門禁、Kiosk、Wallet、QR Code 或邊緣設備執行。

真正好的智慧建築入口，不是讓所有人使用同一種憑證，而是讓不同身份用最適合的憑證，同時回到同一套可管理、可撤回、可追蹤的權限模板。

## 智慧建築身份權限常見問題

### 身份權限模板和門禁群組有什麼不同？

門禁群組通常只處理哪些門可以開。身份權限模板應該更完整，包含身份類型、有效時間、樓層、區域、審核人、撤回條件與稽核紀錄。

### Wallet、QR Code、NFC 卡要分別設定權限嗎？

不應該。比較好的做法是讓不同憑證共用同一套身份權限模板。Wallet、QR Code、NFC 卡只是載體，真正決定能不能通行的是後台規則。

### 哪些身份最需要自動到期？

訪客、廠商、活動來賓與臨時工作人員都應該預設到期。員工則需要和 HR、租戶管理或管理者流程連動，在職務或狀態改變時更新權限。
