const User = require('../models/user')

module.exports.renderRegister =  (req, res) => res.render('users/register')

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        const redirectUrl = res.locals.returnTo || '/hikes';
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome!')
            res.redirect(redirectUrl)
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect(redirectUrl);
    }  
}

module.exports.renderLogin = (req, res) => res.render('users/login')

module.exports.loginUser = (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}` );
    const redirectUrl = res.locals.returnTo || '/hikes';
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/hikes');
    });
}