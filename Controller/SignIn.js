const signIn = (req, res, bcrypt, db, jwt) => {
  const { email, password } = req.body;
  console.log(email)
  db.select('*')
    .from('login')
    .where('email', email)
    .then((userdetail) => {
      const validatepassword = bcrypt.compareSync(password, userdetail[0].hash);
      if (validatepassword) {
        db.select('*').from('users')
          .where('email', email)
          .then(user => {
            // console.log(user)
            // const userdetails = {
            //   id: user[0].id,
            //   email: user[0].email
            // }
            res.status(200).json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      }
      else {
        res.status(400).json('wrong username or password')
      }

    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  signIn: signIn,
};
