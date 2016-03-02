var Counter = require('../models/counter')

function counter(name, done) {
    Counter.findOneAndUpdate({
        _id: name
    }, {
        $inc: { count: 1 }
    }, function(error, counter) {
        if (error) done(error)
        if (counter === null) {
            counter = new Counter({
                _id: name,
                count: 1
            })
            counter.save(function(error) {
                if (error) done(error)
                done(null, 1)
            })
        } else {
            done(null, counter.count + 1)
        }
    })
}

module.exports = counter