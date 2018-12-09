const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('splash.ejs')
})

router.get('/play', function (req, res) {
  res.sendFile('game.html', { root: './public' })
})

module.exports = router
