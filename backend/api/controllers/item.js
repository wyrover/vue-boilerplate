var autoIncrease = require('../auto-increase')
var Storage = require('../../models/item')
var num = require('../../tools/number')

module.exports = function (router) {
	/**
	 * CREATE NEW PRODUK
	 */
	router.post('/item', function (req, res) {
		autoIncrease('Item', (error, num) => {
			if (error) {
				console.error(error)
				res.json(error)
			}

			req.body._id = 'CODE' + new Date().getFullYear().toString().slice(2) + num.toDigit(num, 6)

			// NEXT >>
			createNewProduk(req.body)
		})

		function createNewProduk(item) {
			item = new Storage(item)
			item.save(function (error) {
				if (error) {
					console.error(error)
					res.json(error)
				}

				Storage.findByIdAndUpdate(item._id, item, { new: true }, (error, produk) => {
					if (error) {
						console.error(error)
						res.json(error)
					}
					res.json(produk)
				})
			})
		}
	})
	
	/**
	 * UPDATE PRODUK
	 */
	router.put('/item', function (req, res) {
		Storage.findByIdAndUpdate(req.body._id, req.body, function (error, produk) {
			if (error) {
				console.error(error)
				res.json(error)
			}
			res.json(produk)
		})
	})

	/**
	 * DELETE PRODUK
	 */
	router.delete('/item', function (req, res) {
		Storage.findOne({ _id: req.body._id }, function (error, produk) {
			if (error) {
				console.error(error)
				res.json(error)
			}
			
			Storage.findByIdAndRemove(req.body._id, function (error, produk) {
				if (error) {
					console.error(error)
					res.json(error)
				}
				res.json(produk)
			})
		})
	})
}
