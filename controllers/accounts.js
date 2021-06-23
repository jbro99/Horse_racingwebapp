'use strict';
const horselistStore = require('../models/horselist-store.js');
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const message = require('../models/message-store.js');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const user = userstore.getAllUsers();//getting all the user 
    let numUser = user.length; //getting the length or finding them and calculating
    
    const comments = message.getAllMessages();
    let tMessages = comments.length;
    
    const horselists = horselistStore.getAllHorselists()
    let numHorselists = horselists.length;
    let numHorses = 0;
    for (let i in horselists) {
      numHorses = numHorses + horselists[i].horses.length;
    }
    
   let currentLargest = 0;
   let largestUser = "Unknown";

   for (let i = 0; i < horselists.length; i++) {

    if(horselists[i].horses.length > currentLargest){
        currentLargest = horselists[i].horses.length;
        largestUser = horselists[i].userid;
    }
   }
    
    console.log("The user with the most horses is " + largestUser + "; it has " + currentLargest + " horses");
    
    
    let theUser = userstore.getUserById(largestUser); 
    let currentSmallest = horselists[0].horses.length;
   let smallestUser = horselists[0].userid;

   for (let i = 0; i < horselists.length; i++) {

    if(horselists[i].horses.length < currentSmallest){
        currentSmallest = horselists[i].horses.length;
        smallestUser = horselists[i].userid;
    }
    
}
    let theUserSmall = userstore.getUserById(smallestUser);

console.log("The user with the least horses is " + smallestUser + "; it has " + currentSmallest + " horses");
    
    const viewData = {
    totalUsers: numUser,
    messagesTotal: tMessages,
    title: 'Login or Signup',
    totalHorselists: numHorselists,
    totalHorses: numHorses,
    mostHorses: theUser.firstName,
    leastHorses: theUserSmall.firstName,
    
    };
    response.render('index', viewData);
  },

    login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('horselist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    user.picture = request.files.picture,
    userstore.addUser(user, function() {
    logger.info('registering' + user.email);
    response.redirect('/');
    });
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && request.body.password === user.password) {
      response.cookie('horselist', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.horselist;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;