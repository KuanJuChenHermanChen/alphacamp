const express = require('express')
const exphbs = require('express-handlebars')
const { generateShortUrl } = require('./controller/shorturl')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  generateShortUrl(req.body.url)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})