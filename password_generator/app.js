const express = require('express')
const exphbs = require('express-handlebars')
const generatePassword = require('./generate_password')
const app = express()
const port = 3000

//for body-parser
app.use(express.urlencoded({ extended: true }))

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const options = req.body
  const password = generatePassword(req.body)
  res.render('index', { password, options })
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})