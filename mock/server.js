const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)
server.use(jsonServer.rewriter({
  '/projects/:id/environments/:env_id/configs': '/environments/:env_id/configs',
  '/projects/:id/environments/:env_id/latest_git_log': '/environments/:env_id/latest_git_log',
  '/dashboard/weekly_data': '/weekly_data'
}))


// 支持加载多个db json文件
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)

files.forEach(function (file) {
  _.extend(base, require(path.resolve(mockDir, file)))
})
const router = jsonServer.router(base)

// 返回自定义格式数据

server.post('/wechat/js', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('wechat').value();
  res.json({
    data: data,
    code: 0,
    message: ''
  })
});

server.post('/grade/goods', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('goods').value();
  res.json({
    data: data,
    code: 0,
    message: ''
  })
});

server.post('/order/create', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('order').value();
  res.json({
    data: data,
    code: 0,
    message: ''
  })
});



server.post('/grade/index', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('grade').value();
  res.json({
    data: data,
    code: 0,
    message: ''
  })
});

server.post('/paper/index', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('index').value();
  let vip_last_day = db.get("vip_last_day").value()[0];
  let vip_end_date = db.get("vip_end_date").value()[0];
  res.json({
    data: data,
    vip_last_day: vip_last_day,
    vip_end_date: vip_end_date,
    code: 0,
    message: ''
  })
});

server.post('/paper/question', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('question').value();
  res.json({
    data: data,
    code: 0,
    message: ''
  })
});

server.post('/paper/finish-quesiton', (req, res) => {
  res.json({
    code: 0,
    message: ''
  })
});


server.post('/paper/finish', (req, res) => {
  res.json({
    code: 0,
    message: ''
  })
});

server.post('/report', (req, res) => {
  let db = router.db; // lowdb instance
  let data = db.get('report').value();
  res.json({
    data: data,
    code: 0,
    message: ''
  })
});


server.use(jsonServer.bodyParser);
server.use(router);

// 返回自定义格式数据
server.render = (req, res) => {
  console.log(res.locals.data)
  res.jsonp({
    data: res.locals.data,
    status: 0,
    msg: ''
  })
}


server.listen(9090, () => {
  console.log('JSON Server is running')
});
