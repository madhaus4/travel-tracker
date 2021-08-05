// FILES
import './css/main.scss';
import apiCalls from './apiCalls.js';
import Glide from '@glidejs/glide'



// IMAGES
import './images/menu.png';
import './images/next.png'


import './images/boris-baldinger-eUFfY6cwjSU-unsplash.jpg';
import './images/marek-piwnicki-3Exh4BdB2yA-unsplash.jpg';
import './images/carlos-machado-yGbh_mg9DH8-unsplash.jpg';


let travelersData, currentUserData, tripsData, destinationsData;

let newTrip = {
  "id": Date.now(), 
  "userID": 8,
  "destinationID": 9, 
  "travelers": 2, 
  "date": '2022/06/10', 
  "duration": 7, 
  "status": 'pending', 
  "suggestedActivities": []
}

// EVENT LISTENERS
window.addEventListener('load', checkAPICalls)


// FUNCTIONS
function checkAPICalls() {
  apiCalls.getData()
    .then(promise => {
    travelersData = promise[0].travelers
    currentUserData = promise[1]
    tripsData = promise[2].trips
    destinationsData = promise[3].destinations
    // console.log('travelersData', travelersData)
    // console.log('currentUserData', currentUserData)
    // console.log('tripsData', tripsData)
    // console.log('destinationsData', destinationsData)
  })
  attemptToPostData(newTrip)
  applyGlide()
}


function attemptToPostData(data) {
  apiCalls.requestData.updateTripsData(data)
}


function applyGlide() {
  const config = {
    type: 'carousel',
    startAt: 0,
    perView: 1
  }
  new Glide('.glide', config).mount()
}