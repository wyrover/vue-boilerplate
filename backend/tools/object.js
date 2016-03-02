module.exports = {
	plain(obj) {
		return JSON.parse(JSON.stringify(obj))
	}
}
