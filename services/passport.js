// services/passport.js
const passport = require('passport')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const passportJwt = require('passport-jwt')
const JWTStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

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

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwtPayload, done) => {
  User.findById(jwtPayload, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false)

    done(null, user)
  })
}))
