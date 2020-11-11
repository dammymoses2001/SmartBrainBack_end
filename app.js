const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

//return this when you are done with tssting
// HOST=postgresql-globular-60762
// USER=postgres
// PASSWORD=my password
// DATABASE=smart_brain
// APIKEY =cf490d3ba4954b2380e44693552901ee
// SECRETKEY=lockitifyoucan!!!




// const db = knex({
//   client: 'pg',
//   connection: {
//     host: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   },
// });
// const db = knex({
//   client: 'pg',
//   connection: {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
//   },
// });


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
