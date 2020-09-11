const express = require('express');
// const bcrypt = require('bcryptjs');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    },
});


const updateEntries = require('../Controller/UpdateEntries');
const Rank = require('../Controller/Rank');
const updateProfile = require('../Controller/updateProfile');
const userProfile = require('../Controller/UserProfile');

const route = express.Router();

route.put('/profileEdit', (req, res) =>
    updateProfile.updateProfile(req, res, db)
);
route.get('/userprofile', (req, res) =>
    userProfile.handleProfile(req, res, db,)
);

route.put('/input', (req, res) => updateEntries.input(req, res,));

route.put('/image', (req, res) => updateEntries.updateEntries(req, res, db,));

route.post('/ranking', (req, res) => Rank.handleRank(req, res, db,));

module.exports = route;