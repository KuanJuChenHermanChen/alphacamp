const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().lean().sort({ _id: 'desc' })
    res.render('index', { todos })
  } catch (err) {
    console.error(err)
    next(err);
  }
})

module.exports = router