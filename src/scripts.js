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
import './images/resul-mentes-DbwYNr8RPbg-unsplash.jpg';


// GLOBAL VARIABLES
let travelersData, currentUserData, tripsData, destinationsData;
let currentTraveler, currentTrip;
let date;


// QUERY SELECTORS
const checkPriceBtn = document.querySelector('.check-price-btn')


// EVENT LISTENERS
window.addEventListener('load', getAPIdata)
checkPriceBtn.addEventListener('click', displayTripPriceRequest)


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
    date = '2021/08/09';
    
    console.log(currentTraveler)
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
  displayYearlyTripsTotal()

  domUpdates.renderDestinationsDataList(destinationsData)
}

function displayPastTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPastTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.pastTrips.length > 0) {
    domUpdates.renderPastTrips(theseTrips, destinations2);
  } else {
    console.log(`You do not have any past trips yet`)
  }
}

function displayPresentTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPresentTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.presentTrips.length > 0) {
    domUpdates.renderPresentTrips(theseTrips, destinations2);
  } else {
    console.log(`You're currently not on a trip`)
  }
}

function displayUpcomingTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getUpcomingTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations);

  if (currentTraveler.upcomingTrips.length > 0) {
    domUpdates.renderUpcomingTrips(theseTrips, destinations2);
  } else {
    console.log(`You do not have any upcoming trips`)
  }
}

function displayPendingTrips(currentUserID) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPendingTrips(currentUserID.id);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.pendingTrips.length > 0) {
    domUpdates.renderPendingTrips(theseTrips, destinations2);
  } else {
    console.log(`You do not have any pending trips`)
  }

}

function displayYearlyTripsTotal() {
  let yearlyTotalTripsAmount = getYearlyTripsTotal()
  domUpdates.renderYearlyTripsTotal(yearlyTotalTripsAmount)
}

function displayTripPriceRequest() {
  const tripTotalCost = getTripPriceRequest()
  domUpdates.renderTripPriceRequest(tripTotalCost)
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

function getPastTrips(date) {
  return currentTraveler.findPastTrips('2021/08/09');
}

function getPresentTrips(date) {
  return currentTraveler.findPresentTrips('2021/08/09')
}

function getUpcomingTrips(date) {
  return currentTraveler.findUpcomingTrips('2021/08/09')
}

function getPendingTrips() {
  return currentTraveler.findPendingTrips()
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

function getYearlyTripsTotal() {
  return currentTraveler.calculateYearlyTripsTotal(2021, destinationsData)
}

function getTripPriceRequest() {
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
  let newStartDate = startDate.split('-').join('/')

  let newTrip = {
    "id": Date.now(), 
    "userID": currentTraveler.id,
    "destinationID": findDestinationID.id, 
    "travelers": Number(numOfTravelers), 
    "date": newStartDate, 
    "duration": (tripDuration / (60*60*24*1000)), 
    "status": 'pending', 
    "suggestedActivities": []
  }
  
  currentTrip = new Trip(newTrip)
  let tripTotalCost = currentTrip.returnTripTotalForGroup(newTrip, findDestinationID)
  apiCalls.requestData.updateTripsData(currentTrip)
  return {currentTrip, destinationsList, tripTotalCost};
}






// function generateRandomUser(data) {
//   return Math.floor(Math.random() * data.length);
// }

// function applyGlide() {
//   const config = {
//     type: 'carousel',
//     startAt: 0,
//     perView: 1
//   }
//   new Glide('.glide', config).mount()
// }