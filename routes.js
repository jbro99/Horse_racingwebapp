'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
//const profile = require('./controllers/profile.js');
const horselist = require('./controllers/horselist.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers
router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

//router.get('/profile', profile.index);
router.get('/horselist/:id', horselist.index);
//We will now add a new route - containing both the horselist and name id - that links
//to the new deleteName function in the horselist controller:
router.get('/horselist/:id/deleteName/:nameid', horselist.deleteName);
router.get('/dashboard/deletehorselist/:id', dashboard.deletehorselist);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/horselist/:id/addname', horselist.addName);
router.post('/dashboard/addhorselist', dashboard.addHorselist);
router.post('/horselist/:id/updatename/:nameid', horselist.updateName);

router.post('/addmessage', about.addMessage);
// export router module
module.exports = router;