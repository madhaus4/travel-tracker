import './css/main.scss';
import Traveler from './Traveler.js';
import Trip from './Trip.js';
import apiCalls from './apiCalls.js';
import domUpdates from './domUpdates.js'
import './images/menu.png';
import './images/next.png'
import './images/boris-baldinger-eUFfY6cwjSU-unsplash.jpg';
import './images/marek-piwnicki-3Exh4BdB2yA-unsplash.jpg';
import './images/carlos-machado-yGbh_mg9DH8-unsplash.jpg';
import './images/resul-mentes-DbwYNr8RPbg-unsplash.jpg';


// GLOBAL VARIABLES
let travelersData, currentUserData, tripsData, destinationsData;
let currentTraveler, currentTrip;
let date ='2021/08/10';


// QUERY SELECTORS
const checkPriceBtn = document.getElementById('checkPriceBtn')
const continueBtn = document.getElementById('continueBtn')
const userNameField = document.getElementById('userName')
const passwordField = document.getElementById('password')
const checkInField = document.getElementById('startDate')
const checkOutField = document.getElementById('endDate')
const goingToField = document.getElementById('destinationChoice')
const guestsField = document.getElementById('numOfTravelers')
const tripPriceContainer = document.getElementById('tripPriceContainer')

// const requestTripBtn = document.getElementById('requestTripBtn')
// const tripContainer = document.getElementById('tripContainer')


// EVENT LISTENERS
window.addEventListener('load', getFetchedData)
continueBtn.addEventListener('click', displayMainPage)
passwordField.addEventListener('keyup', function(event) {
  if (event.code === 'Enter') {
    continueBtn.click();
  }
})
checkPriceBtn.addEventListener('click', function(event) {
  displayTripPriceRequest(event)
})
tripPriceContainer.addEventListener('click', function(event) {
  displayNewPendingTrips(event)
})


// DISPLAY MAIN PAGE FUNCTION
function displayMainPage() {
  const userNameInput = getUserInputID()
  if (!userNameInput) {
    domUpdates.renderLoginFailedMsg()
  } else {
    getFetchedData(userNameInput)
    getTrips(userNameInput, tripsData, date)
    verifyLoginInput(userNameInput)
  }
}



// LOGIN FUNCTIONS
function verifyLoginInput(userID) {
  const userInfo = checkUserInputID(userID)
  const passingUsername = `traveler${userInfo.id}`
  const passingPasssword = verifyPassword()

  if (userInfo && passingUsername && passingPasssword) {
    domUpdates.renderMainPage()
    displayTrips(currentTraveler)
  } else if (!userInfo || !passingUsername || !passingPasssword) {
    domUpdates.renderLoginFailedMsg()
    continueBtn.disabled = true;
    clearInputFields()
  }
} 

function getUserInputID() {
  let verifiedUserName = userNameField.value.split()
  let userID = []

  verifiedUserName.forEach(elem => {
    let a = elem.charAt(8)
    let b = elem.charAt(9)
    userID.push(a, b)
  })

  let userID2 = Number(userID.join(''))
  if (userID2) {
    return userID2
  } else if (isNaN()) {
    return false
  }
}

function checkUserInputID(userID) {
  if (userID <= 50 && userID > 0) {
    return true
  } else {
    return false
  }
}

function verifyPassword() {
  if (passwordField.value === 'travel') {
    return true
  } else 
  if (passwordField.value !== 'travel') {
    return false
  }
}

function clearInputFields() {
  if (continueBtn.disabled) {
    userNameField.value = ''
    passwordField.value = ''
    continueBtn.disabled = false;
  } else {
    userNameField.value = ''
    passwordField.value = ''
  }
}



// FETCH FUNCTIONS
function getFetchedData(id) {
  continueBtn.disabled = false;
  Promise.all([
    apiCalls.retrieveData(`travelers`),
    apiCalls.retrieveData(`travelers/${id}`),
    apiCalls.retrieveData(`trips`),
    apiCalls.retrieveData(`destinations`)
  ])
  .then(data => assignFetchedData(data))
}

function assignFetchedData(data) {
    travelersData = data[0].travelers
    currentUserData = data[1]
    tripsData = data[2].trips
    destinationsData = data[3].destinations
    currentTraveler = new Traveler(currentUserData)

    let name = currentTraveler.name.split(' ')
    domUpdates.renderWelcomeMsg(name[0]) 
}



// DISPLAY USER TRIPS
function displayTrips(currentUserID) {
  displayYearlyTripsTotal()
  displayPastTrips(currentUserID, date)
  displayPresentTrips(currentUserID, date)
  displayUpcomingTrips(currentUserID, date)
  displayPendingTrips(currentUserID)
  domUpdates.renderDestinationsDataList(destinationsData)
}

function displayPastTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPastTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.pastTrips.length > 0) {
    domUpdates.renderPastTrips(theseTrips, destinations2);
  } else {
    domUpdates.renderNoPastTrips()
  }
}

function displayPresentTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPresentTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.presentTrips.length > 0) {
    domUpdates.renderPresentTrips(theseTrips, destinations2);
  } else {
    domUpdates.renderNoPresentTrips()
  }
}

function displayUpcomingTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getUpcomingTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations);

  if (currentTraveler.upcomingTrips.length > 0) {
    domUpdates.renderUpcomingTrips(theseTrips, destinations2);
  } else {
    domUpdates.renderNoUpcomingTrips()
  }
}

function displayPendingTrips(currentUserID) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPendingTrips(currentUserID.id);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.pendingTrips.length > 0) {
    domUpdates.renderPendingTrips(theseTrips, destinations2);
  } else {
    domUpdates.renderNoPendingTrips()
  }
}

function displayYearlyTripsTotal() {
  let yearlyTotalTripsAmount = getYearlyTripsTotal()
  domUpdates.renderYearlyTripsTotal(yearlyTotalTripsAmount)
}

function displayTripPriceRequest() {
  const tripTotalCost = getTripPriceRequest()
  domUpdates.renderTripPriceRequest(tripTotalCost)
  checkPriceBtn.disabled = true;
}

function clearTripInputFields() {
  checkInField.value = ''
  checkOutField.value = ''
  goingToField.value = 0
  guestsField.value = ''
  checkPriceBtn.disabled = false;
}



// USER TRIPS HELPER FUNCTIONS
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
  return [...new Set(destinationArr)]
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
    "status": "pending", 
    "suggestedActivities": []
  }
  
  currentTrip = new Trip(newTrip)
  apiCalls.updateData(currentTrip)
    .then(domUpdates.renderAdditionalPendingTrips(currentTrip, destinationsData))
    
    let tripTotalCost = currentTrip.returnTripTotalForGroup(newTrip, findDestinationID)
    return {currentTrip, destinationsList, tripTotalCost};
}

function displayNewPendingTrips() {
  domUpdates.renderTripRequestMsg()
  clearTripInputFields()
}

// const show = (element) => {
//   element.classList.remove('hidden');
// };

// const hide = (element) => {
//   element.classList.add('hidden');
// };