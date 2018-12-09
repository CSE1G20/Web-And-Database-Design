const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')

mongoose.connect(process.env.MONGOLAB_URI || config.database)
let db = mongoose.connection

// Check connection
db.once('open', function () {
  console.log('Connected to MongoDB')
})

// Check for DB errors
db.on('error', function (err) {
  console.log(err)
})

// Init app
const app = express()

// Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// Route Files
let users = require('./routes/users')
app.use('/users', users)

// Passport Config
require('./config/passport')(passport)
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('*', function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// TODO: move to index | Home Route
app.get('/', (req, res) => {
  res.render('splash.ejs')
})

app.get('/play', function (req, res) {
  res.sendFile('game.html', { root: './public' })
})

// var server = http.createServer(app)
let port = process.env.PORT
if (port == null || port === '') {
  port = 8000
}
app.listen(port)
