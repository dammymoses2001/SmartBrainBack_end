
const handleProfile = (req, res, db, jwt) => {
    const { email } = req.body;
    console.log(req.token)
    jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
        if (err) {
            res.status(400).json(err.message);
        } else {
            db.select('*').from('users').where('email', '=', email)
                .then(user => {
                    if (user.length) {
                        res.json(user[0])
                    }
                    else {
                        res.status(400).json('not found');
                    }
                })
        }
    })


}

module.exports = {
    handleProfile
}