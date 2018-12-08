var express = require('express')
var http = require('http')
var path = require('path')
var app = express()
var port = process.argv[2]

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

// TODO: move to index
app.get('/', (req, res) => {
  res.render('splash.ejs')
})

app.get('/play', function (req, res) {
  res.sendFile('game.html', { root: './public' })
})

var server = http.createServer(app)

server.listen(port)
