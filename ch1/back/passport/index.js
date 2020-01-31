const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../models');

module.exports = ( )=>{
    passport.use(new LocalStrategy)({
        usernameField: 'email',
        passwordField: 'password'
    }, async (userId, password, done) => {
        const exUser = await db.User.findOne({ where: { email }});
        if (!exUser){
            return done(null, false, { reason: '존재하지 않는 사용자입니다.'})
        }
    })
};