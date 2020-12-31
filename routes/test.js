const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const koaBody = require('koa-body');
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

router.get('/fsupload', async (ctx, next) => {
  await ctx.render('fsupload', {
    title: 'fs upload test'
  })
})

router.post('/fsupload', async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  // let filePath = path.join(process.cwd(), 'public/upload') + `/${file.name}`;
  // let filePath = '/Users/liusongdi/Desktop/testupload' + `/${file.name}`;
  let filePath = path.resolve(process.cwd(), '../testupload') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = ctx.request.body;
})

router.get('/fstest', async (ctx, next) => {
  fs.readdir('./', (err, data) => {
    if (err) { console.error(err); return; }
    console.log(data);
  })
  ctx.body = 'fstest'
})

module.exports = router