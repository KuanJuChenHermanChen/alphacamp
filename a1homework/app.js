const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
require('./models/seeds/restaurantSeeder')
const app = express()
const port = 3005

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:number', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.number)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  )
  if (restaurants.length === 0) {
    res.render('noSearchResults')
  } else {
    res.render('index', { restaurants })
  }

})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})