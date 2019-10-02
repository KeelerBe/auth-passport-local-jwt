// model/User.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type:Date,
    default: Date.now()
  }
})

userSchema.pre('save', function(next) {
  const user = this
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

userSchema.methods.verifyPassword = function(inputPassword, cb) {
  bcrypt.compare(inputPassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

mongoose.model('users', userSchema)