const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const passportConfig = require('./passport');

const app = express();

db.sequelize.sync({ force: true });

app.use(cors('http://localhost:3000'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    // res.send('안녕 백앤드');
    res.status(200).send('안녕 GGM');
});

app.post('/user', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password,12);
        const exUser = db.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (exUser){
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

app.listen(3085, () => {
    console.log('백엔드 서버에서 작동중');
});
