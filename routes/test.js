const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const koaBody = require('koa-body');
const dateFormat = require('dateformat')
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
  // console.log(process.cwd());
  // console.log('http://180.76.224.216/static/' + 'images/')

  await ctx.render('fsupload', {
    title: 'fs upload test'
  })
})

router.post('/fsupload', async (ctx, next) => {
  const theFilePath = ctx.request.body.filepath

  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);

  let extName = ctx.request.body.extname
  extName = file.name.split('.').pop()

  file.name = new Date().getTime() + '.' + extName
  console.log(file.name);

  let filePath = path.resolve('/www/wwwroot/static', theFilePath) + `/${file.name}`;
  console.log(filePath);

  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  return ctx.body = 'upload success';
})

router.get('/fstest', async (ctx, next) => {
  fs.readdir('./', (err, data) => {
    if (err) { console.error(err); return; }
    console.log(data);
  })
  ctx.body = 'fstest'
})

module.exports = router