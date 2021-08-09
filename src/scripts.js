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


// var dayjs = require('dayjs')
// dayjs().format()
  
let travelersData, currentUserData, tripsData, destinationsData;
let currentTraveler, currentTrip;
let date;

const checkPriceBtn = document.querySelector('.check-price-btn')


// EVENT LISTENERS
window.addEventListener('load', getAPIdata)
checkPriceBtn.addEventListener('click', doThisWhenUserChecksPrice)


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
  const destinations2 = getDestinationDataByTrip(pastTrips, destinations)

  if (currentTraveler.pastTrips.length > 0) {
    domUpdates.renderPastTrips(pastTrips, destinations2);
  } else {
    console.log(`You do not have any past trips yet`)
  }
}

function displayPresentTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const presentTrips = getPresentTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(presentTrips, destinations)

  if (currentTraveler.presentTrips.length > 0) {
    domUpdates.renderPresentTrips(presentTrips, destinations2);
  } else {
    console.log(`You're currently not on a trip`)
  }
}

function displayUpcomingTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const upcomingTrips = getUpcomingTrips(currentUserID, date);

  if (currentTraveler.upcomingTrips.length > 0) {
    domUpdates.renderUpcomingTrips(upcomingTrips, destinations);
  } else {
    console.log(`You do not have any upcoming trips`)
  }
}

function displayPendingTrips(currentUserID) {
  const destinations = getDestinationData(currentUserID.id);
  const pendingTrips = getPendingTrips(currentUserID.id);
  const destinations2 = getDestinationDataByTrip(pendingTrips, destinations)

  if (currentTraveler.pendingTrips.length > 0) {
    domUpdates.renderPendingTrips(pendingTrips, destinations2);
  } else {
    console.log(`You do not have any pending trips`)
  }
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
  currentTraveler.findUpcomingTrips(tripsData, currentUserID, date)
  if (currentTraveler.upcomingTrips.length > 0) {
    return currentTraveler.upcomingTrips;
  }
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
  return [...new Set(userDestinations)];
}

function getDestinationDataByTrip(tripCategory, userDestinations) {
  let destinationArr = []
  tripCategory.filter(trip => {
    userDestinations.forEach(desto => {
      if (trip.destinationID === desto.id) {
        destinationArr.push(desto)
      }
    })
  })
  return destinationArr
}

function doThisWhenUserChecksPrice(event) {
  event.preventDefault(event)
  // figureOutInputBox()
  domUpdates.renderTripPrice()
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

  let findDestinationID = destinationsData.find(destination => destination.destination === destinationsList)

  let tripDuration = new Date(endDate) - new Date(startDate)

  let newTrip = {
    "id": Date.now(), 
    "userID": currentTraveler.id,
    "destinationID": findDestinationID.id, 
    "travelers": Number(numOfTravelers), 
    "date": startDate, 
    "duration": (tripDuration / (60*60*24*1000)), 
    "status": 'pending', 
    "suggestedActivities": []
  }
  
  currentTrip = new Trip(newTrip)
  let cost = currentTrip.returnTripTotalForGroup(newTrip, findDestinationID)
  // console.log('currentTrip', currentTrip)
  // console.log('cost', cost)
}






// function generateRandomUser(data) {
//   return Math.floor(Math.random() * data.length);
// }

// function attemptToPostData(data) {
//   apiCalls.requestData.updatedata(data)
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