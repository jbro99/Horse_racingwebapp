'use strict';

// import all required modules
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const messageStore = require('../models/message-store.js');

// create start object
const about = {
 //let numHorselists = horselists.length;
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    logger.info('about rendering');
    if (loggedInUser) {
      
      const viewData = {
        title: 'About the Horselist App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
        messages: messageStore.getAllMessages(),
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
  addMessage(request, response, date) {
    const loggedInUser = accounts.getCurrentUser(request);
    const message = request.body.message;
    logger.info('We received your message' + message);
    const newM = {
      messagetext: message,  
      date: new Date(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture:loggedInUser.picture,
    };
    messageStore.addMessage(newM);
    response.redirect ('/about');
},
};

// export the start module
module.exports = about;