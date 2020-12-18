const router = require('koa-router')()
const dateFromat = require('dateformat')
const DbindexArticles = require('../model/DbindexArticles')

router.prefix('/api')

let testDoc = new DbindexArticles({
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
  await DbindexArticles.insertMany(testDoc, (err, docs) => {
    if (err) { console.error(err); return }
    console.log(docs);
  })
  ctx.body = 'insert'
})



module.exports = router
