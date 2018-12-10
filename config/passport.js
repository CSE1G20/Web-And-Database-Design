const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const app = express()
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

module.exports = function (passport) {
  // Local Strategy
  passport.use(new LocalStrategy(function (username, password, done) {
    // Match Username
    let query = { username: username }
    User.findOne(query, function (err, user) {
      if (err) throw err
      if (!user) {
        return done(null, false, { message: 'No user found' })
      }

      // Match Passport
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Wrong password' })
        }
      })
    })
  }))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}
