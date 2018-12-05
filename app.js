var express = require('express')
var http = require('http')
var path = require('path')
var indexRouter = require('./routes/index')

var port = process.argv[2]
var app = express()

app.use(express.static(path.resolve(__dirname, 'public')))
app.get('/play', indexRouter)

http.createServer(app).listen(port)
