const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res, next) => {
  try {
    res.render('new')
  } catch (err) {
    console.error(err)
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name.trim()
    await Todo.create({ name })
    res.redirect('/')
  } catch (err) {
    console.error(err)
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const todo = await Todo.findById(id).lean()
    res.render('detail', { todo })
  } catch (err) {
    console.error(err)
    next(err);
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id
    const todo = await Todo.findById(id).lean()
    res.render('edit', { todo })
  } catch (err) {
    console.error(err)
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const name = req.body.name.trim()
    const isDone = req.body.isDone === 'on'
    const todo = await Todo.findById(id)
    todo.name = name
    todo.isDone = isDone
    await todo.save()
    res.redirect(`/todos/${id}`)
  } catch (err) {
    console.error(err)
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Todo.findByIdAndDelete(id)
    res.redirect('/')
  } catch (err) {
    console.error(err)
    next(err);
  }
})

module.exports = router