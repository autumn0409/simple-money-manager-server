# Simple Money Manager

一個簡易記帳系統，除了提供直覺美觀的 GUI ，也提供了資料庫存取來儲存這些帳務紀錄。
* 前端: React / Redux
* 後端: Node.js / Express / MySQL

## Demo

<https://nodejs-money-manager.herokuapp.com/>

## Frontend Repo

<https://github.com/autumn0409/simple-money-manager-client>

## 功能簡介

### 單一帳務管理

帳務可為收入或是支出，而任一筆帳務可進行以下之操作：

- 新增：單一帳務新增之內容包含大分類(收入 or 支出，支出再細分為現金與悠遊卡)、金額、類型(如飲食、交通，或是使用者自行新增之類型)、備註、時間等。

- 修改：可針對單一帳務進行修改。

- 刪除：刪除單一帳務。

### 圖表統計

可依照月份來顯示當月各種類型支出或收入的統計，並以圓餅圖的方式顯示統計結果。

### 類型(category)管理

提供使用者新增／刪除自訂分類的功能
