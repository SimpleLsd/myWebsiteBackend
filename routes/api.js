const router = require('koa-router')()
const dateFromat = require('dateformat')
const DbIndexArticles = require('../model/DbIndexArticles')

router.prefix('/api')

let testDoc = new DbIndexArticles({
  num: 1,
  title: 'test title',
  desc: 'test desc',
  abstract: 'test abstract',
  tag: 'test tag',
  date: new Date(),
  coverLink: 'http://www.baidu.com'
})

router.get('/', async (ctx, next) => {
  ctx.body = 'api'
})

router.get('/insert', async (ctx, next) => {
  await DbIndexArticles.insertMany(testDoc, (err, docs) => {
    if (err) { console.error(err); return }
    console.log(docs);
  })
  ctx.body = 'insert'
})



module.exports = router
