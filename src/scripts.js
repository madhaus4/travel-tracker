// FILES
import './css/main.scss';
import apiCalls from './apiCalls.js';


// IMAGES
import './images/menu.png';
import './images/next.png'


import './images/boris-baldinger-eUFfY6cwjSU-unsplash.jpg';
import './images/marek-piwnicki-3Exh4BdB2yA-unsplash.jpg';
import './images/photo-1553882951-9c3dab4a50cb.jpeg';

import Glide from '@glidejs/glide'



let travelersData, currentUserData, tripsData, destinationsData;
// EVENT LISTENERS
window.addEventListener('load', checkAPICalls)


// FUNCTIONS
function checkAPICalls() {
  apiCalls.getData()
    .then(promise => {
    travelersData = promise[0]
    currentUserData = promise[1]
    tripsData = promise[2]
    destinationsData = promise[3]
    // console.log('travelersData', travelersData)
    // console.log('currentUserData', currentUserData)
    // console.log('tripsData', tripsData)
    // console.log('destinationsData', destinationsData)
    attemptToPostData(tripsData, newTrip)
  })
}

let newTrip = {
  id: 201, 
  userID: 8, 
  destinationID: 9, 
  travelers: 2, 
  date: '2022/06/10', 
  duration: 7, 
  status: 'pending', 
  suggestedActivities: []
}

function attemptToPostData(path, data) {
  apiCalls.requestData.updateTripsData(path, data)
  console.log(data)
}