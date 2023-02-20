const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean()
    res.render('index', { restaurants })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router