// controllers/authController.js
const passport = require('passport')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('users')

module.exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res
          .status(401)
          .send({ message: info ? info.message : 'Login failed.' })
      }

      const payload = {
        _id: user._id,
        email: user.email
      }

      req.login(payload, { session: false }, (err) => {
        if (err) return next(err)
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' })
        res.json({ token })
      })
    }
  )(req, res, next)
}

module.exports.register = (req, res, next) => {
  const { username, email, password } = req.body

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(401)
          .send({ message: 'Email is already in use. '})
      }

      new User({ username, email, password})
        .save()
        .then((user) => {
          return res
            .status(201)
            .send({ message: 'Registration successful.' })
        })
    }).catch((err) => {
      return res
        .status(401)
        .send({ message: 'Registration failed.' })
    })
}

module.exports.logout = (req, res, next) => {
  req.logout()
  res.send(true)
}

module.exports.user = [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.send(req.user)
  }
]