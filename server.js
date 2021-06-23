// use javascript in strict mode
'use strict';

// import all required modules
const express = require("express");
const logger = require('./utils/logger');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');// includeing this module in here and initialise it correctly

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));

// use bodyParser and cookieParser
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(fileUpload());//adding this also from above to work

// use handlebars as view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    uppercase: function(word) {
        return word.toUpperCase();
    },
    capitalise: function(word) {// passing ina word e.g horses
      let capitalisedWord = word[0].toUpperCase()// changing the element at 0, small h to capalitise H
      capitalisedWord = capitalisedWord+word.slice(1);// making capitalisedWord  equal to the big H & the word from element 1 
      return capitalisedWord;// returns Horses
      
      //return word[0].toUpperCase()+word.slice(1); //short way of doing it
    },
     formatDate: function(date) {
        let d = new Date(date);
        let dateNum = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let day = d.getDay();
       
       let days  = ["Sun", "Tues", "Wed", "Thu", "Fri", "Sat"];

        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Ju",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
       
        let dayname = days[day];
        let monthname = months[month];
        return dayname + " " + monthname + " " + dateNum + ", " + year;
      }
  }
}));
app.set('view engine', '.hbs');

// import routes file and use this for routing
const routes = require('./routes');
app.use('/', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info('Your app is listening on port ' + listener.address().port);
});