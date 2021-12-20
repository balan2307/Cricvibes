const isLoggedIn = (req, res, next) => {
    req.session.user ? next() : res.redirect('/user/register');
}

module.exports=isLoggedIn;