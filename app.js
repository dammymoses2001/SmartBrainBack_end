const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

console.log(process.env.NAME)
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
});


// app.get('/name', (req, res) => {
//   res.send('Hello');
// });
const user = require('./routes/user');
const index = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json(database.users);
});

app.use('/', user);
app.use('/', index);


app.listen(3000, () => {
  console.log('Listening');
});
