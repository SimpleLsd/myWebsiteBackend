const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost:27017/indexarticles',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) { console.error(err); return }
  }
)

const indexArticleSchema = new mongoose.Schema({
  num: Number,
  title: String,
  desc: String,
  abstract: String,
  tags: String,
  date: {
    type: Date,
    default: new Date()
  },
  coverLink: String,
})

const DbTest = mongoose.model('test', tsetSchema, 'test')

// module.exports = DbTest