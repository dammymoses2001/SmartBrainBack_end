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
    host: '127.0.0.1',
    user: 'postgres',
    password: 'my password',
    database: 'smart_brain'
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
  res.send('/welcome here');
});

app.use('/', user);
app.use('/', index);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening', port);
});
