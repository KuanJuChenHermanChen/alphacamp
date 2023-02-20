const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:number', async (req, res) => {
  try {
    const restaurant = await Restaurant.find(
      restaurant => restaurant.id.toString() === req.params.number
    )
    res.render('show', { restaurant })
  } catch (error) {
    console.log(error)
  }
})

router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword.trim().toLowerCase()
    const restaurants = await Restaurant.filter(restaurant =>
      restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
    )
    if (restaurants.length === 0) {
      res.render('noSearchResults')
    } else {
      res.render('index', { restaurants })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router