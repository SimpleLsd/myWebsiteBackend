const router = require('koa-router')()
const dateFromat = require('dateformat')
const DbTest = require('../model/DbTest')

router.prefix('/test')

router.get('/', async (ctx, next) => {
  await DbTest.find({}, (err, docs) => {
    if (err) { console.error(err); return; }
    console.log(docs);
  })
  ctx.body = 'success'
})
module.exports = router
