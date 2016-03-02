function hybridWorkers(funs, callback) {
	'use strict';
	let l = funs.length
	function done() {
		// console.log('a worker has done:', l)
		if (--l === 0 && callback) {
			callback()
		}
	}
	funs.forEach(fun => fun(done))
}

module.exports = hybridWorkers
