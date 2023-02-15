const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//嘗試把CSS分離看看
app.get('/', (req, res) => {
  res.render('index', { css: 'index.css', restaurants: restaurantList.results })
})

app.get('/restaurants/:number', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.number)
  res.render('show', { css: 'show.css', restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword)
  })
  if (restaurants.length === 0) {
    res.render('noSearchResults', { css: 'index.css' })
  } else {
    res.render('index', { css: 'index.css', restaurants })
  }

})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})