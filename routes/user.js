const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    },
});
const register = require('../Controller/Register');
const signInUser = require('../Controller/SignIn');
const route = express.Router();

route.post('/signIn', (req, res) => signInUser.signIn(req, res, bcrypt, db, jwt));

route.post('/register', (req, res) =>
    register.handleRegister(req, res, db, bcrypt)
);

module.exports = route;