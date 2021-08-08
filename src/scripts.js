import './css/main.scss';
// FILES
import Glide from '@glidejs/glide'
import Traveler from './Traveler.js';
import Trip from './Trip.js';
import apiCalls from './apiCalls.js';
import domUpdates from './domUpdates.js'
// IMAGES
import './images/menu.png';
import './images/next.png'
import './images/boris-baldinger-eUFfY6cwjSU-unsplash.jpg';
import './images/marek-piwnicki-3Exh4BdB2yA-unsplash.jpg';
import './images/carlos-machado-yGbh_mg9DH8-unsplash.jpg';




// let newTrip = {
  //   "id": Date.now(), 
  //   "userID": 8,
  //   "destinationID": 9, 
  //   "travelers": 2, 
  //   "date": '2022/06/10', 
  //   "duration": 7, 
  //   "status": 'pending', 
  //   "suggestedActivities": []
  // }
  
let travelersData, currentUserData, tripsData, destinationsData;
let currentTraveler, currentTrip;
let date;


// EVENT LISTENERS
window.addEventListener('load', getAPIdata)


// FUNCTIONS
function getAPIdata() {
  apiCalls.getData()
    .then(promise => {
    travelersData = promise[0].travelers
    currentUserData = promise[1]
    tripsData = promise[2].trips
    destinationsData = promise[3].destinations
    
    currentTraveler = new Traveler(currentUserData)
    currentTrip = new Trip(tripsData[0])
    date = '2021/08/08';

    getTrips(currentUserData, tripsData, '2021/08/08')
  })
}


// display
function displayTrips() {}

function displayPastTrips(userID, date) {
  const pastTrips = getPastTrips(userID, date)
  domUpdates.renderPastTrips(pastTrips);
}

function displayPresentTrips() {}
function displayUpcomingTrips() {}
function displayPendingTrips() {}

// get
function getTrips(currentUserID, tripsData, date) {
  getUserTrips(currentUserID)
  getPastTrips(tripsData, currentUserID, date)
  getPresentTrips(tripsData, currentUserID, date)
  getUpcomingTrips(tripsData, currentUserID, date)
  getPendingTrips(tripsData, currentUserID)

  getDestinationData(currentUserID)
}


function getUserTrips(currentUserID) {
  return currentTraveler.findCurrentUserTrips(tripsData, currentUserID.id)
}

function getPastTrips(tripsData, currentUserID, date) {
  let pastTrips = currentTraveler.findPastTrips(tripsData, currentUserID.id, date);
  // console.log('pastTrips', pastTrips)
  return pastTrips;
}

function getPresentTrips(tripsData, currentUserID, date) {
  let presentTrips = currentTraveler.findPresentTrips(tripsData, currentUserID.id, date)
  // console.log('presentTrips', presentTrips)
  return presentTrips;
}

function getUpcomingTrips(tripsData, currentUserID, date) {
  let upcomingTrips = currentTraveler.findUpcomingTrips(tripsData, currentUserID.id, date)
  // console.log('upcomingTrips', upcomingTrips)
  return upcomingTrips;
}

function getPendingTrips(tripsData, currentUserID) {
  return currentTraveler.findPendingTrips(tripsData, currentUserID.id)
}

function getDestinationData(currentUserID) {
  let userTrips = getUserTrips(currentUserID.id)
  let userDestinations = []
  destinationsData.filter(destination => {
    userTrips.forEach(trip => {
      if (destination.id === trip.destinationID) {
        userDestinations.push(destination)
      }
    })
  })
  return userDestinations;
}








// function generateRandomUser(data) {
//   return Math.floor(Math.random() * data.length);
// }

// function attemptToPostData(data) {
//   apiCalls.requestData.updateTripsData(data)
//   console.log(data)
// }

// function applyGlide() {
//   const config = {
//     type: 'carousel',
//     startAt: 0,
//     perView: 1
//   }
//   new Glide('.glide', config).mount()
// }