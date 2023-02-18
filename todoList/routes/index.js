const express = require('express')
const router = express.Router()

//引入路由模組
const home = require('./modules/home')
const todos = require('./modules/todos')

//將網址結構符合 / 字串的 request 導入 home 模組
router.use('/', home)
//將網址結構符合 /todos 字串開頭的 request 導入 todos 模組
router.use('/todos', todos)

//匯出路由器
module.exports = router