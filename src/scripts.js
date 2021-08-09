import './css/main.scss';
// FILES
// import Glide from '@glidejs/glide'
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

const checkPriceBtn = document.querySelector('.check-price-btn')


// EVENT LISTENERS
window.addEventListener('load', getAPIdata)
checkPriceBtn.addEventListener('click', figureOutInputBox)


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
    // console.log('currentTrip', currentTrip)
    date = '2021/08/08';

    getTrips(currentUserData, tripsData, '2021/08/08')
    displayTrips(currentUserData)
  })
}


// DISPLAY FUNCTIONS
function displayTrips(currentUserID) {
  displayPastTrips(currentUserID, date)
  displayPresentTrips(currentUserID, date)
  displayUpcomingTrips(currentUserID, date)
  displayPendingTrips(currentUserID)

  domUpdates.renderDestinationsDataList(destinationsData)
}

function displayPastTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const pastTrips = getPastTrips(currentUserID, date);
  domUpdates.renderPastTrips(pastTrips, destinations);
}

function displayPresentTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const presentTrips = getPresentTrips(currentUserID, date);
  domUpdates.renderPresentTrips(presentTrips, destinations);
}

function displayUpcomingTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const upcomingTrips = getUpcomingTrips(currentUserID, date);
  domUpdates.renderUpcomingTrips(upcomingTrips, destinations);
}

function displayPendingTrips(currentUserID) {
  const destinations = getDestinationData(currentUserID.id);
  const pendingTrips = getPendingTrips(currentUserID.id);
  domUpdates.renderPendingTrips(pendingTrips, destinations);
}



// HELPER FUNCTIONS
function getTrips(currentUserID, tripsData, date) {
  getUserTrips(currentUserID)
  getPastTrips(tripsData, currentUserID, date)
  getPresentTrips(tripsData, currentUserID, date)
  getUpcomingTrips(tripsData, currentUserID, date)
  getPendingTrips()

  getDestinationData(currentUserID)
}

function getUserTrips(currentUserID) {
  return currentTraveler.findCurrentUserTrips(tripsData, currentUserID)
}

function getPastTrips(tripsData, currentUserID, date) {
  let pastTrips = currentTraveler.findPastTrips(tripsData, currentUserID, date);
  return pastTrips;
}

function getPresentTrips(tripsData, currentUserID, date) {
  let presentTrips = currentTraveler.findPresentTrips(tripsData, currentUserID, date)
  return presentTrips;
}

function getUpcomingTrips(tripsData, currentUserID, date) {
  let upcomingTrips = currentTraveler.findUpcomingTrips(tripsData, currentUserID, date)
  return upcomingTrips;
}

function getPendingTrips() {
  currentTraveler.findPendingTrips()
  if (currentTraveler.pendingTrips.length > 0) {
    return currentTraveler.pendingTrips
  }
}

function getDestinationData(currentUserID) {
  let userTrips = getUserTrips(currentUserID)
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

function figureOutInputBox() {
  let startDate = document.getElementById('startDate')
  let endDate = document.getElementById('endDate')
  let destinationsList = document.getElementById('destinationChoice')
  let numOfTravelers = document.getElementById('numOfTravelers')

  startDate = startDate.value 
  endDate = endDate.value
  destinationsList = destinationsList.value
  numOfTravelers = numOfTravelers.value
  console.log(startDate)
  console.log(endDate)
  console.log(destinationsList)
  console.log(numOfTravelers)

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