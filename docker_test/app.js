const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('ghwhgwehwh')
})

app.listen(port, (req, res) => {
  console.log('start on 3000')
})