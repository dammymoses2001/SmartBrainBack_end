const updateProfile = (req, res, db) => {
  const { oldemail, email, name } = req.body;
  db('login')
    .where('email', '=', oldemail)
    .update({
      email,
    })
    .returning('*')
    .then((data) => {
      db('users')
        .where('email', '=', oldemail)
        .update({
          name,
          email,
        })
        .returning('*')
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json('user already exist'));

  //   db.transaction((trx) => {
  //     trx
  //       .update({
  //         email: 'admin@gmail.com',
  //         name: 'name',
  //       })
  //       .into('user')
  //       .returning('email')
  //       .then((loginEmail) => {
  //         return trx('login')
  //           .returning('*')
  //           .update({
  //             name: name,
  //             email: loginEmail[0],
  //           })
  //           .then((user) => res.json(user[0]))
  //           .catch((err) => res.json(err));
  //       })
  //       .then(trx.commit)
  //       .catch(trx.rollback);
  //   }).catch((err) => res.status(400).json(err));
};
module.exports = {
  updateProfile: updateProfile,
};
