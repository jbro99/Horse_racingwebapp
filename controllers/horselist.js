'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
const horselistStore = require('../models/horselist-store');
const accounts = require ('./accounts.js');

const horselist = {
  
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const horselistId = request.params.id;
    logger.debug('Horselist id = ' + horselistId);
    if (loggedInUser) {
    const viewData = {
    title: 'Horselist',
    horselist: horselistStore.getHorselist(horselistId),
    fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    picture: loggedInUser.picture,
    };
    response.render('horselist', viewData);
  }
    else response.redirect('/');
  },
  
  //This is a new function to handle this route; add it in controllers/playlist.js just after the end of the index function closing bracket },
    deleteName(request, response) {
    const horselistId = request.params.id;
    const horseId = request.params.nameid;
    logger.debug(`Deleting Song ${horseId} from Horselist ${horselistId}`);
    horselistStore.removeName(horselistId, horseId);
    response.redirect('/Horselist/' + horselistId);
  },
  
  //Add this new function in the playlist controller:
   addName(request, response) {
    const horselistId = request.params.id;
    const horselist = horselistStore.getHorselist(horselistId);
      
      //logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    const newName = {
      id:uuid(),
      name: request.body.name,
      trainer: request.body.trainer,
      jockey: request.body.jockey,
      distance: request.body.distance
    };
     logger.debug(`Title `+ newName.title);
    horselistStore.addName(horselistId, newName);
    response.redirect('/horselist/' + horselistId);
  },
 //added the updateSong method in the controller 
  updateName(request, response) {
    const horselistId = request.params.id;
    const horseId = request.params.nameid;
    logger.debug("updating name " + horseId);
    const updatedName = {
      name: request.body.name,
      trainer: request.body.trainer,
      jockey: request.body.jockey,
      duration: request.body.duration
    };
    horselistStore.editName(horselistId, horseId, updatedName);
    response.redirect('/horselist/' + horselistId);
  }
};

module.exports = horselist;