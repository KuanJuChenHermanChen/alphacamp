'use strict'

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('ghwhgwehwh')
})

app.listen(port, (req, res) => {
  console.log('start on 3000')
})