'use strict';
// import all required modules
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const horselistStore = require('../models/horselist-store.js');
// create start object
const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    if(loggedInUser){
const horselists = horselistStore.getAllHorselistsByUser(loggedInUser.id);
let numHorselists = horselists.length;
let numNames = 0;
for (let i in horselists) {
    numNames = numNames + horselists[i].horses.length;
}
let numHorselists1 = horselists.length;

      
      let avgHorses = 0;
      let smallestHorse = "No RaceCourse added";
      let largestHorse = "No RaceCourse added";
  if(numHorselists1 > 0){
        for (let i in horselists) {//for every racecourse i want to find the avg no. of horses
            avgHorses = avgHorses + horselists[i].horses.length/numHorselists1;//for each racecourse im finding the lengh of each horses array and dividing it by the no. of racecourses
        }
        let currentLargest = horselists[0].horses.length;//finding the no. of horses at the first racecourse at 0
         largestHorse = horselists[0].title;//finding the title of the racecourse at element 0
        for (let i = 0; i < horselists.length; i++) {//gouing though each racecourse
            if(horselists[i].horses.length >= currentLargest){// if the racouse is larger than the one stored then we pick that one
                currentLargest = horselists[i].horses.length;//gwtting the vaues of the racecourses
                largestHorse = horselists[i].title;//storing the title
          }
        }
          console.log("The horselist with the most horses is " + largestHorse + "; it has " + currentLargest + " horses");
        const horselists4 = horselistStore.getAllHorselistsByUser(loggedInUser.id);
        let currentSmallest = horselists[0].horses.length;
         smallestHorse = horselists[0].title;
        for (let i = 0; i < horselists.length; i++) {
            if(currentSmallest > horselists[i].horses.length  ){
                currentLargest = horselists[i].horses.length;
                smallestHorse = horselists[i].title;
          }
        }
          console.log("The horselist with the most horses is " + smallestHorse + "; it has " + currentSmallest + " horses");
  }
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the Horse Racing App!',
      totalHorselists: numHorselists,
      totalNames: numNames,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      averageHorses: avgHorses,
      largestHorses: largestHorse,
      smallestHorses: smallestHorse,
    };
    // render the start view and pass through the data
    response.render('start', viewData);
  }
    else response.redirect('/');
},
};
// export the start module
module.exports = start;