var express = require('express')
var Router = express.Router()

require('./controllers/item')(Router)

Router.get('/:model', function (req, res, next) {
	var key,
		Model = require('../models/' + req.params.model),
		regexs = {}

	if (!Model)
		next({ message: 'Model datbase not found' })
	
	if (req.query.json)
		req.query = JSON.parse(req.query.json)
	
	if (req.query.regexs !== null && typeof req.query.regexs === 'object') {
		for (key in req.query.regexs) {
			if (typeof req.query.regexs[key] === 'string') {
				regexs[key] = new RegExp(req.query.regexs[key], 'i')
			} else {
				regexs[key] = new RegExp(req.query.regexs[key].pattern, req.query.regexs[key].flags)
			}
		}
	}
	
	Model.find({ $and: [req.query.q || {}, regexs ] })
		.sort(req.query.sort || '')
		.select(req.query.select || '')
		.skip(+req.query.skip || 0)
		.limit(+req.query.limit || 0)
		.populate(req.query.populate || '')
		.exec(function (err, data) {
			if (err) {
				console.log(err)
				res.json({ error: err, data: data })
			} else {
				if (req.query.check) {
					res.json(data[0]? true : false)
				} else {
					res.json(data)
				}
			}
		})
})

module.exports = Router
