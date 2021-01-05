const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const koaBody = require('koa-body');
const dateFromat = require('dateformat')
const DbTest = require('../model/DbTest')

router.prefix('/edit')

router.get('/', async (ctx, next) => {
  await DbTest.find({}, (err, docs) => {
    if (err) { console.error(err); return; }
    console.log(docs);
  })
  ctx.body = 'success'
})

router.get('/indexArticlesInsert', async (ctx, next) => {
  await ctx.render('indexArticlesInsert', {
    title: 'indexArticlesInsert'
  })
})

router.post('/indexArticlesInsert', async (ctx, next) => {
  console.log(1);
  await ctx.render('index', {
    title: 'redirect to indexArticlesInsert'
  })
  console.log(ctx.request.body);
  ctx.redirect('back', '/indexArticlesInsert')
})

/*
 *
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  
 */

router.get('/fsupload', async (ctx, next) => {
  await ctx.render('fsupload', {
    title: 'fs upload test'
  })
})

router.post('/fsupload', async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  const file = ctx.request.files.file; // 获取上传文件
  const reader = fs.createReadStream(file.path);
  let filePath = path.resolve(process.cwd(), '../testupload') + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  return ctx.body = ctx.request.body;
})

module.exports = router