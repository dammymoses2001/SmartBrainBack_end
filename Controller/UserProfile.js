
const handleProfile = (req, res, db) => {
    const { email } = req.body;

    db.select('*').from('users').where('email', '=', email)
        .then(user => {
            if (user.length) {
                res.status(200).json(user[0])
            }
            else {
                res.status(400).json('not found');
            }
        })
    // }
    //})


}

module.exports = {
    handleProfile
}