'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const developerStore = {

  store: new JsonStore('./models/developer-store.json', { developers: [] }),
  collection: 'developers',



  // function to get all of the playlists
  getAllDevelopers() {
   return this.store.findAll(this.collection);
  },

};

// export the devoloperStore object so it can be used elsewhere
module.exports = developerStore;