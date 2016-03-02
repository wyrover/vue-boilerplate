var mongoose = require('mongoose')
var Schema = mongoose.Schema

var counterSchema = Schema({
	_id: {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('counter', counterSchema)
