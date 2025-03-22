const signUp = (req, res, next) => {
    res.json({
        status: 'success',
        message: 'Se creo la cuenta'
    })
};

module.exports = {signUp};