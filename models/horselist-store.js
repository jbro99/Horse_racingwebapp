'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const horselistStore = {

  store: new JsonStore('./models/horselist-store.json', { horselistCollection: [] }),
  collection: 'horselistCollection',

  getAllHorselists() {
    return this.store.findAll(this.collection);
  },
  
   getAllHorselistsByUser(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  getAllHorselists() {
    return this.store.findAll(this.collection);
  },

  getHorselist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

    addHorselist(horselist, response) {
    horselist.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            horselist.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, horselist);
  },

  removeHorselist(id) {
    const horselist = this.getHorselist(id);
    this.store.remove(this.collection, horselist);
  },

  removeAllHorselists() {
    this.store.removeAll(this.collection);
  },

  addName(id, name) {
    const horselist = this.getHorselist(id);
    horselist.horses.push(name);
  },

  removeName(id, nameId) {
    const horselist = this.getHorselist(id);
    const names = horselist.horses;
    _.remove(names, { id: nameId});
  },
  // adding the editName method in the playlist-store.js file here 
   editName(id, nameId, updatedName) {
    const horselist = this.getHorselist(id);// getting the correct horselist or racecourse based on the id that was passed into the function
    const horses = horselist.horses;// we getting the horses array from that horselist
    const index = horses.findIndex(name => name.id === nameId);//checking wheather the current name id matches with the name id that has 
     //been passed into the editName function. then checks eac name in the array until it finds a match. returns the index of the matching array element
     
    horses[index].title = updatedName.title;// updating the properties of the name object
    horses[index].artist = updatedName.artist;
    horses[index].genre = updatedName.genre;
    horses[index].duration = updatedName.duration;
  }
};

module.exports = horselistStore;