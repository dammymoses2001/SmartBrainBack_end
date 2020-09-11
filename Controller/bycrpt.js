const bcrypt = require('bcryptjs');
var knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'my password',
      database : 'testing'
    }
  });


const hashpassword=(req,res)=>{
    const {name} = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("my password", salt);
    //console.log(hash);
    knex('used').insert({
        name: name,
        hash: hash
    })
    .then(data=>res.json(data[0]))

}

module.exports={
    hashpassword:hashpassword,
    //unHashPassword:unHashPassword
}