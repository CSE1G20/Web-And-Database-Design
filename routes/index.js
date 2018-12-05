var express = require('express')
var router = express.Router()

app.use(express.static(__dirname + '/public'))

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile('splash.html', { root: './public' })
})

/* Press Play GET game page */
router.get('/play', function (req, res) {
  res.sendFile('game.html', { root: './public' })
})

module.exports = router
