const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// 載入 mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
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

//引用路由器
const routes = require('./routes')

const app = express()
const port = 3000

//setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//將request 導入路由器
app.use(routes)

app.listen(port, (req, res) => {
  console.log('start on 3000')
})