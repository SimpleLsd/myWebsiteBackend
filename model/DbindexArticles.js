const mongoose = require('mongoose')
const options = require('./Options')

mongoose.connect(options.mongodbUrl, options.options, (err) => {
  if (err) { console.error(err); return }
})

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

const DbindexArticles = mongoose.model('indexarticles', indexArticleSchema, 'indexarticles')

module.exports = DbindexArticles