---
status: Published
date: 2026-06-20
order: 2
series: VivaTech / 科技展觀察
title: AI agent 進入旅宿與服務業，真正要改變的不是客服話術
subtitle: 從 VivaTech 的 agentic AI 訊號出發，看 AI 如何接進訂房、櫃台、房務、推薦與品牌曝光。
author: Cellbedell
tags:
  - VivaTech 2026
  - AI Agent
  - 旅宿科技
  - 服務設計
hero_image: /assets/2026-06-19-vivatech-sge-pavilion.jpg
hero_image_alt: Viva Technology 展會現場與展區活動
hero_image_credit: S-GE / SwissTech Pavilion
summary: AI agent 在旅宿與服務業的重點，不是取代現場人員，而是把訂房、查詢、房務、偏好記錄與旅客推薦變成可被交辦、可追蹤、可控管的流程。
next_direction: 旅宿 AI agent 流程清單, 飯店如何準備 AI 搜尋曝光, VivaTech 2026 展後總回顧
sources:
  - title: VivaTech 2026 Day Two Digest
    url: https://vivatech.com/news/viva-tech-2026-day-two-digest
  - title: OpenAI / New tools for building agents
    url: https://openai.com/index/new-tools-for-building-agents/
  - title: OpenAI / Introducing ChatGPT agent
    url: https://openai.com/index/introducing-chatgpt-agent/
  - title: Whose hotel does the AI recommend?
    url: https://arxiv.org/abs/2606.16344
  - title: The End of Rented Discovery
    url: https://arxiv.org/abs/2603.20062
---

VivaTech 2026 談 AI agent 時，最值得旅宿與服務業注意的，不是「AI 能不能像真人一樣聊天」。真正的變化在後面：AI 開始能接工具、查資料、執行多步驟任務，從回答問題變成協助完成流程。

這對飯店、餐飲、展場、零售與生活服務都很關鍵。服務業最耗人的地方，往往不是單一問題太難，而是小任務太碎：查房況、改日期、確認付款、回答交通問題、整理客訴、通知房務、推薦餐廳、記錄客人偏好。AI agent 如果只停在聊天，就只是比較聰明的 FAQ；如果能接進 PMS、CRM、訂房系統、客服工單與內部 SOP，它才會變成真正的服務基礎建設。

## 第一個落點：把旅客問題變成可追蹤的任務

現在很多飯店已經有 chatbot，但旅客體感常常很普通，因為它只能回答既有問題，不能真正處理事情。AI agent 的差別，在於它可以把一句自然語言拆成任務。

例如旅客說：「我明天下午會早到，可以先寄行李嗎？附近有適合帶小孩吃晚餐的地方嗎？」傳統客服會分成兩段回答；更成熟的 agent 則應該可以同時確認入住政策、建立行李備註、讀取親子旅客偏好、推薦附近餐廳，必要時把特殊需求轉給櫃台或 concierge。

這裡的重點不是讓 AI 假裝成一位完美管家，而是讓每一次對話都能留下結構化紀錄。服務業最怕資訊斷掉：訂房平台知道一件事、櫃台知道一件事、房務又不知道。AI agent 真正有價值的地方，是把對話變成能被團隊接續處理的工作流。

## 第二個落點：把櫃台從資料輸入拉回款待

旅宿現場最矛盾的是，大家都知道 hospitality 的核心是人，但櫃台人員常常被迫花大量時間處理最不像 hospitality 的事：證件、表單、付款、房卡、系統切換、重複確認。

OpenAI 的 agent 工具方向很清楚：web search、file search、computer use、multi-agent orchestration，都是為了讓模型能查資料、讀文件、操作介面、交接任務。放到飯店現場，這代表 AI 可以先處理大量背景工作，例如入住前資料整理、常見問題回覆、客戶偏好摘要、房務異常提醒、班表與工單摘要。

這不代表櫃台不需要人。剛好相反，好的 AI agent 應該把人從行政摩擦裡釋放出來。當護照號碼、付款狀態、早餐時段和房型備註不再佔掉整段對話，現場人員才有空間做真正的服務：判斷旅客情緒、處理例外、給在地建議、建立記憶點。

## 第三個落點：AI 搜尋會改變飯店被看見的方式

旅客不只會在飯店官網或 OTA 上找住宿，也越來越可能問 AI：「東京適合第一次自由行、交通方便、不要太吵的飯店有哪些？」這時候，飯店被不被推薦，可能取決於 AI 讀到哪些資料、怎麼理解評價、價格、地點、環保認證與內容描述。

最近兩篇針對 AI 旅宿搜尋的研究都很值得注意。一篇分析 LLM 輔助選飯店時，客評與價格仍然非常有影響力，但 list position 這種看似無內容的排序訊號也可能改變推薦結果。另一篇研究 Google Gemini 的旅宿引用來源，指出體驗型查詢比較容易引用非 OTA 來源，這代表飯店自己的內容、在地指南、品牌敘事與可被搜尋的資料，可能重新取得一點主導權。

這件事對旅宿品牌很重要。過去 SEO 是寫給搜尋引擎，未來一部分內容會變成寫給 AI agent。飯店不只要有漂亮照片，還要把自己的位置、交通、服務特色、永續措施、家庭友善程度、餐飲體驗與在地連結整理成 AI 容易理解、來源可信、可被引用的資料。

## 第四個落點：服務業最需要的是 guardrails，不是全自動

AI agent 一旦能執行任務，風險也會變得更具體。它可能訂錯日期、誤解取消規則、給出不存在的優惠、在沒有授權時修改訂單，或把不該被分享的客戶資料帶進對話。

所以旅宿與服務業導入 agent，不應該從「讓它自己處理所有事」開始，而是從低風險、可回溯、有明確邊界的流程開始。比較適合的第一批任務包括：常見問題、入住前提醒、內部知識查詢、客訴分類、房務工單摘要、推薦草稿、班表與交接摘要。

真正涉及金流、退款、升等、取消、個資與安全的任務，應該保留人工確認。這不是保守，而是服務業的基本信任設計。AI agent 越能做事，就越需要知道什麼時候停下來請人決定。

## 最好的 agent，不是把人拿掉，而是讓服務更連續

VivaTech 的 agentic AI 訊號放到旅宿現場，最值得想像的不是無人飯店，而是服務變得更連續。

旅客在訂房前問過的問題，抵達時櫃台知道。入住期間提過的需求，房務知道。離店後的回饋，品牌知道。下一次再來時，系統能提醒員工這位客人喜歡安靜樓層、早餐偏早、上次問過附近親子餐廳。

這種連續性不是 AI 自己創造的，而是 AI 幫服務團隊把零散資訊接起來。對旅宿與服務業來說，AI agent 最好的角色不是取代人味，而是把那些會消耗人味的重複工作悄悄拿走，讓人有更多時間做只有人能做好的事。
