const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.keyword.trim()
    //從資料庫的name和category中找出有包含關鍵字 keyword 的資料
    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
    }).lean()
    if (restaurants.length === 0) {
      res.render('noSearchResults')
    } else {
      res.render('index', { restaurants })
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/:number/edit', async (req, res) => {
  try {
    const _id = req.params.number
    const restaurant = await Restaurant.find({ _id }).lean()
    res.render('edit', { restaurant: restaurant[0] })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:number', async (req, res) => {
  try {
    const _id = req.params.number
    const restaurant = await Restaurant.find({ _id }).lean()
    res.render('show', { restaurant: restaurant[0] })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:number', async (req, res) => {
  try {
    const _id = req.params.number
    await Restaurant.findByIdAndUpdate(_id, req.body)
    res.redirect(`/restaurants/${_id}`)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:number', async (req, res) => {
  try {
    const _id = req.params.number
    await Restaurant.findByIdAndDelete({ _id })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router