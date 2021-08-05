// FILES
import './css/main.scss';
import apiCalls from './apiCalls.js';


// IMAGES
import './images/menu.png';






window.addEventListener('load', doSomething)




function doSomething() {
  apiCalls.getData()
    .then(promise => {
    let travelersData = promise[0]
    let currentUserData = promise[1]
    let tripsData = promise[2]
    let destinationsData = promise[3]
  })
  console.log(travelersData)
}