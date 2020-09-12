const handleRank = (req, res, db) => {
    const { email } = req.body;
    db('users').orderBy('entries', 'desc')
        .returning('entries')
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].email === email) {
                    //console.log(i)
                    res.json((i + 1))
                }
                // res.json((data))

            }
        })

}

module.exports = {
    handleRank
};