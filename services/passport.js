// services/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false, { message: 'Invalid username or password.' })

    user.verifyPassword(password, (err, isMatch) => {
      if (err) return done(err)
      if (!isMatch) return done(null, false, { message: 'Invalid username or password.' })

      done(null, user)
    })
  })
}))
