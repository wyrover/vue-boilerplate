var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compress = require('compression')
var mongoose = require('mongoose')
var apiRouter = require('./api/api')
var config = require('../config')
var app = express()

mongoose.connect(config.database.url)

app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(__dirname + '/../dist'))

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})
app.use('/api/', apiRouter)

app.use(function (req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500)
		res.json({
			message: err.message,
			error: err
		})
	})
}

app.use(function (err, req, res, next) {
	res.status(err.status || 500)
	res.json({
		message: err.message,
		error: {}
	})
})

module.exports = app
