module.exports.setFlash = function(req, res, next) {
    res.locals.flash = {
        'Success': req.flash('Success'),
        'error': req.flash('error')
    }
    next();
}