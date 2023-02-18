const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

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

//setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
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

app.get('/todos/new', (req, res, next) => {
  try {
    res.render('new')
  } catch (err) {
    console.error(err)
    next(err);
  }
  
})

app.post('/todos', async (req, res, next) => {
  try {
    const name = req.body.name.trim()
    await Todo.create({name})
    res.redirect('/')
  } catch (err) {
    console.error(err)
    next(err);
  } 
})

app.get('/todos/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const todo = await Todo.findById(id).lean()
    res.render('detail', { todo })
  } catch (err) {
    console.error(err)
    next(err);
  }
})

app.get('/todos/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id
    const todo = await Todo.findById(id).lean()
    res.render('edit', { todo })
  } catch (err) {
    console.error(err)
    next(err);
  }
})

app.put('/todos/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const name = req.body.name.trim()
    const todo = await Todo.findById(id)
    todo.name = name
    await todo.save()
    res.redirect(`/todos/${id}`)
  } catch (err) {
    console.error(err)
    next(err);
  }
})

app.delete('/todos/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Todo.findByIdAndDelete(id)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    next(err);
  }
})


app.listen(port, (req, res) => {
  console.log('start on 3000')
})