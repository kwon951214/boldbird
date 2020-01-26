const express = require('express');
const db = require('./models');
const app = express();

db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    // res.send('안녕 백앤드');
    res.status(200).send('안녕 GGM');
});

app.post('/user', async (req, res, next) => {
    try {
        const newUser = await db.User.create({
            where: {
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickname
            }
        });//HTTP STATUS CODE
        res.status(201).json(newUser); //문자열일땐 json말고 send
    } catch (e) {
        console.log(error);
        next(error);
    }

});

app.listen(3085, () => {
    console.log('백엔드 서버에서 작동중');
});
