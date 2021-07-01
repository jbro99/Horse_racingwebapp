'use strict';

// import all required modules
const accounts = require ('./accounts.js');
const uuid = require('uuid');
const logger = require('../utils/logger');
const horselistStore = require('../models/horselist-store.js');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Horse Racing App Dashboard',
      horselists: horselistStore.getAllHorselistsByUser(loggedInUser.id),
      fullname: loggedInUser.firstName + '' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    // render the dashboard view and pass through the data
      
    logger.info('about to render', viewData.horselists);
    response.render('dashboard', viewData);
  }
    else response.redirect('/');
  },
  deletehorselist(request, response) {
    const horselistId = request.params.id;// creating a variable called horselistId and giving it a value of whats in the box what you have assigned it to
    logger.debug(`Deleting  horselist ${horselistId}`);//debugs stuff
    horselistStore.removeHorselist(horselistId);//
    response.redirect('/dashboard/');
  },
  
  addHorselist(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newHorseList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      horses: [],
    };
    logger.debug('Creating a new Horselist' + newHorseList);
    horselistStore.addHorselist(newHorseList, function() {;
    response.redirect('/dashboard');
  });
},
};

// export the dashboard module
module.exports = dashboard;