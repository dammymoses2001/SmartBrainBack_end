
const handleRegister = (req, res, db, bcrypt) => {
  const { name, password, email } = req.body;
  var hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      email: email,
      hash: hash
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0],
            entries: 0,
            joined: new Date().toDateString()
          })
          .then(user => res.json(user[0]))
          .catch(err => {
            console.log(err)
            res.json(err)
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })

    .catch(err => {
      console.log(err)
      res.status(400).json('err')
    });

}

module.exports = {
  handleRegister: handleRegister
}
// if(!email || !password){
    //     return res.status(400).json('All field are mandtory');
    // }