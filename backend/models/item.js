var mongoose = require('mongoose')
var Schema = mongoose.Schema

var itemSchema = Schema({
	_id: { type: String, required: true },
	name: String
})

module.exports = mongoose.model('Item', itemSchema)
