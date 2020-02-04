const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const usersRouter = require('./routes/users');
const app = express();

db.sequelize.sync({force: true});
passportConfig();

app.use(morgan('dev'));
app.use(cors('http://localhost:3000'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret'
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    // res.send('안녕 백앤드');
    res.status(200).send('안녕 GGM');
});

app.use('/user', usersRouter);
app.post('/user', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = db.User.findOne({
            email: req.body.email
        });
        if (exUser) {
            return res.status(403).json({
                errorCode: 1,
                message: '이미 회원가입되어있습니다'
            });
        }
        const newUser = await db.User.findOne({
            where: {
                email: req.body.email,
                password: hash,
                nickname: req.body.nickname
            }//HTTP STATUS CODE
        });
        res.status(201).json(newUser); //문자열일땐 json말고 send
    } catch (e) {
        console.log(error);
        return next(error);
    }

});

const user = {
    'test1': 1,
    'test2': 2,
    'test3': 3,

};

app.post('/user/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, (err) => { //세션에 사용자 정보 저장 ->serializeuser로
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json(user);
        })
    })(req, res, next);
});

app.post('/user/logout', (req, res) => {
    if (req.isAuthenticated()){
        req.logout();
        req.session.destroy();
        return res.status(200).send('로그아웃')
    }
});
app.post('/post', (req, res) => {
    if (req.isAuthenticated()){

    }
});
app.listen(3085, () => {
    console.log('백엔드 서버에서 작동중');
});
