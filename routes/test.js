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
  console.log(process.cwd());
  console.log('http://180.76.224.216/static/' + 'images/')
  await ctx.render('fsupload', {
    title: 'fs upload test'
  })
})

router.post('/fsupload', async (ctx, next) => {
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const extName = file.name.split('.').pop()
  file.name = '1'
  console.log(file);

  // let filePath = path.resolve(process.cwd(), '../testupload') + `/${file.name}`;
  let filePath = path.resolve('/www/wwwroot/static', 'images') + `/${file.name}`;
  // console.log(filePath);
  const upStream = fs.createWriteStream(filePath);
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