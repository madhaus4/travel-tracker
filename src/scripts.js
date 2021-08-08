import './css/main.scss';
// FILES
import Glide from '@glidejs/glide'
import Travelers from './Traveler.js';
import Trips from './Trip.js';
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
  
let travelersData, currentUserData, tripsData, destinationsData, currentTraveler, currentTrip;

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
    
    currentTraveler = new Travelers(generateRandomUser(travelersData))
    currentTrip = new Trips(tripsData, destinationsData)

    displayPastTrips(currentTraveler)
  })
}


// display
function displayPastTrips(userID, date) {
  const pastTrips = getPastTrips(userID, date)
  domUpdates.renderPastTrips(pastTrips);
}

// get
function getPastTrips(userID, date) {
  console.log('tripsData', currentTrip)
  return currentTrip.findPastTrips(userID, date);
}



function generateRandomUser(data) {
  console.log(Math.floor(Math.random() * data.length))
  return Math.floor(Math.random() * data.length);
}


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