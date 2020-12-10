const router = require('koa-router')()

const Dbtest = require('../model/DbTest')

router.prefix('/database')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/add', async (ctx, next) => {
  ctx.body = 'addData'
})

module.exports = router
