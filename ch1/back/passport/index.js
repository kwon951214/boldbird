const passport = require('passport');

module.exports = () => {
    passport.serialiseUser((user, done) => {
        return done(null, user.id)
    });
    passport.deserializeUser(() => {

    })
};