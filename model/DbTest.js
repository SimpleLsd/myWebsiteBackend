const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) { console.error(err); return }
})

const tsetSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
})

const DbTest = mongoose.model('test', tsetSchema, 'test')

// User.find({}, (err, data) => {
//   if (err) { console.error(err); return }
//   console.log(data);
//   console.log('--------------');
// })

module.exports = DbTest