'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const MessageStore = {

  store: new JsonStore('./models/message-store.json', {messages: []}),
  collection: 'messages',

  getAllMessages() {
    return this.store.findAll(this.collection);
  },

  addMessage(message) {
    this.store.add(this.collection, message);
  }
}

module.exports = MessageStore;
