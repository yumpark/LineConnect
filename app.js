const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const teacherRouter = require('./routes/teacher');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route 추가(폴더 만들어서 분리 가능)
app.get('/hello', (req, res, next) =>{
    console.log('hello');
    res.send("hello");
})

app.get('/', function(req, res){
  res.render('index');
})

//recommend
app.get('/about', function(req, res){
  res.render('about');
})

app.get('/about2', function(req, res){
  res.render('about2');
})

//게시판
app.get('/bbs-ent', function(req, res){
  res.render('bbs-ent');
})

app.get('/bbs-hob', function(req, res){
  res.render('bbs-hob');
})

//강사로 등록
app.get('/contact', function(req, res){
  res.render('contact');
})

//ent로 묶어보기
app.get('/ent-drum', function(req, res){
  res.render('ent-drum');
})

app.get('/ent-guitar', function(req, res){
  res.render('ent-guitar');
})

app.get('/ent-piano', function(req, res){
  res.render('ent-piano');
})

app.get('/ent-vocal', function(req, res){
  res.render('ent-vocal');
})

//hobby로 묶어보기
app.get('/hobby-drum', function(req, res){
  res.render('hobby-drum');
})

app.get('/hobby-guitar', function(req, res){
  res.render('hobby-guitar');
})

app.get('/hobby-piano', function(req, res){
  res.render('hobby-piano');
})

app.get('/hobby-vocal', function(req, res){
  res.render('hobby-vocal');
})

//login, 회원가입
app.get('/login', function(req, res){
  res.render('login');
})

app.get('/join', function(req, res){
  res.render('join');
})

app.use('/users', usersRouter);

app.use('/board', boardRouter);

app.use('/teacher', teacherRouter);

app.use( (req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});



/* app.post('/loginProc', (req, res) =>{
  const user_id = req.body.user_id;
  const pw = req.body.pw;

  var sql = `select * from member  where user_id=? and pw=? `

  var values = [user_id, pw];

  ConnectionAcquireTimeoutError.query(sql, values, function(err, result){
    if(err) throw err;

    res.send(result);
  })
})*/