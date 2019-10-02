const express = require('express')
require('dotenv').config()
require('colors')

require('./models/User')

const app = express()

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
  console.log(`***** Listening on PORT ${PORT} ******` .bgMagenta))