const mongoose = require('mongoose')
const options = require('./Options')

mongoose.connect(options.mongodbUrl, options.options, (err) => {
  if (err) { console.error(err); return }
})

const tsetSchema = new mongoose.Schema({
  num: Number,
  message: String
})

const DbTest = mongoose.model('test', tsetSchema, 'test')

module.exports = DbTest