const router = require('koa-router')()

router.prefix('/edit')

router.get('/', async (ctx, next) => {
  await ctx.render('edit', {
    title: 'edit'
  })
})

router.get('/doEdit', async (ctx, next) => {
  ctx.body = 'doedit'
})

module.exports = router
