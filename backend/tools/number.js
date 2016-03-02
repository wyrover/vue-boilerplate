module.exports = {
    toDigit(value, num) {
        return  '0'.repeat(num - value.toString().length) + value.toString()
    }
}