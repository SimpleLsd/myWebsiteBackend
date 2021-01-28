const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const koaBody = require('koa-body');
const dateFormat = require('dateformat')
const DbIndexArticles = require('../model/DbIndexArticles')

router.prefix('/edit')

router.get('/', async (ctx, next) => {
  ctx.body = 'success'
})

router.get('/indexArticles', async (ctx, next) => {
  let data = await DbIndexArticles.find({}, (err, data) => {
    if (err) { console.error(err); return; }
  })
  let listData = []
  for (i = 0; i < data.length; i++) {
    listData[i] = {}
    listData[i].num = data[i].num
    listData[i].title = data[i].title
    listData[i].desc = data[i].description
    listData[i].abstract = data[i].abstract
    listData[i].coverLink = data[i].coverLink
    listData[i].tags = data[i].tags
    listData[i].id = data[i]._id
    listData[i].date = dateFormat(data[i].date, " yyyy-mm-dd H:MM")
  }
  await ctx.render('indexArticles', {
    title: 'indexArticles',
    data: listData
  })
})

router.get('/indexArticlesInsert', async (ctx, next) => {
  await ctx.render('indexArticlesInsert', {
    title: 'indexArticlesInsert'
  })
})

router.get('/indexArticlesInsertManual', async (ctx, next) => {
  // 
  let testDoc = new DbIndexArticles({
    num: 1,
    title: 'test title new',
    desc: 'test desc new',
    abstract: 'test abstract new',
    tags: ['tag1', 'tag2', 'tag3'],
    date: new Date(),
    coverLink: 'http://www.baidu.com'
  })

  await DbIndexArticles.insertMany(testDoc, (err, docs) => {
    if (err) { console.error(err); return }
  })
  ctx.body = 'insertOK'
  ctx.redirect('back', '/edit/indexArticlesInsert')
})

router.post('/indexArticlesInsert', async (ctx, next) => {
  const theFilePath = ctx.request.body.filepath
  const file = ctx.request.files.cover;
  const reader = fs.createReadStream(file.path);
  let extName = ctx.request.body.extname
  let newData = ctx.request.body

  extName = file.name.split('.').pop()

  let data = await DbIndexArticles.find({}, (err, data) => {
    if (err) { console.error(err); return; }
  })
  await ctx.render('index', {
    title: 'redirect to indexArticles'
  })
  if (newData.title) {
    if (!newData.num) {
      newData.num = data.length + 1
    }
  } else {
    console.log('data is not complete');
  }

  file.name = new Date().getTime() + '.' + extName
  let filePath = path.resolve('/www/wwwroot/static', theFilePath) + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);

  newData.date = new Date()
  newData.coverLink = 'http://180.76.224.216/static/' + newData.filepath + `/${file.name}`

  delete newData.extname
  delete newData.filepath

  console.log(newData);

  await DbIndexArticles.insertMany(newData, (err, docs) => {
    if (err) { console.error(err); return }
  })

  ctx.redirect('back', '/indexArticles')
})

router.post('/indexArticlesDelete', async (ctx, next) => {
  const itemId = ctx.request.body.id

  await DbIndexArticles.deleteOne({ _id: itemId }, (err, data) => {
    if (err) { console.error(err); return; }
  })
  ctx.redirect('back', '/indexArticles')
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