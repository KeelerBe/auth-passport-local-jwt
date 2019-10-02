// index.js
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
require('colors')

require('./models/User')
const authRoutes = require('./routes/authRoutes')

mongoose.connect('mongodb://localhost/auth-test', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res, next) => res.send({ app: 'auth-passport-local-jwt' }))
app.use('/', authRoutes)

app.use((err, req, res) => {
  res.status(422).send({ message: err.message })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
  console.log(`***** Listening on PORT ${PORT} ******` .bgRed))