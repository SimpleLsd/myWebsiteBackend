const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const koaBody = require('koa-body');
const dateFromat = require('dateformat')
const DbIndexArticles = require('../model/DbIndexArticles')

router.prefix('/edit')

router.get('/', async (ctx, next) => {
  ctx.body = 'success'
})

router.get('/indexArticles', async (ctx, next) => {
  await DbIndexArticles.find({}, async (err, data) => {
    if (err) { console.error(err); return; }
    // console.log(docs);
    await ctx.render('indexArticles', {
      data: data
    })
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
    console.log(docs);
  })
  ctx.body = 'insertOK'
  ctx.redirect('back', '/edit/indexArticlesInsert')
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