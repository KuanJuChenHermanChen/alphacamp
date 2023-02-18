const express = require('express')
const exphbs = require('express-handlebars')

// 載入 mongoose
const mongoose = require('mongoose')
// 載入 dotenv
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得預設連線
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const Todo = require('./models/todo')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().lean()
    res.render('index', { todos })
  } catch (err) {
    console.error(err)
    next(err);
  }
})

app.listen(port, (req, res) => {
  console.log('start on 3000')
})