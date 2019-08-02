# Simple-Accounting-System

## Demo

<https://oop-money-manager.herokuapp.com/>

## 系統架構及功能簡介

此系統主要是想幫助個人的日常帳務紀錄，故除了提供直覺美觀的 GUI 外，也提供了資料庫存取來儲存這些帳務紀錄。

### 系統架構

本系統主要分為三大部分：前端、後端及資料庫：
前端是以 javascript 搭配 React framework 撰寫，後端則是以 java 搭配 spring boot、spring MVC 等 framework 撰寫，前後端的連接是藉由
RESTful api，資料庫則選擇了 mongodb。

### 功能簡介

#### 單一帳務管理

帳務可為收入或是支出，而任一筆帳務可進行以下之操作：

- 新增：單一帳務新增之內容包含大分類(收入 or 支出，支出再細分為現金與悠遊卡)、金額、類型(如飲食、交通，或是使用者自行新增之類型)、備註、時間等。

- 修改：可針對單一帳務進行修改。

- 刪除：刪除單一帳務。

#### 圖表統計

可依照月份來顯示當月各種類型支出或收入的統計，並以圓餅圖的方式顯示統計結果。

#### 類型(category)管理

提供使用者新增／刪除自訂分類的功能

## 使用到的套件

- java.util
- org.json
- lombok
- org.springframework.beans.factory.annotation
- org.springframework.http
- org.springframework.web.bind.annotation
- org.springframework.data.annotation
- org.springframework.data.mongodb.core.mapping
- org.springframework.data.mongodb.repository
- org.springframework.stereotype

## GUI 介面截圖

![Alt text](/resource/main.png)
![Alt text](/resource/chart.png)
![Alt text](/resource/category.png)
