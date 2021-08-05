// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/main.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/menu.png';

// console.log('This is the JavaScript entry file - your code begins here.');
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
    console.log('travelersData', travelersData)
    console.log('currentUserData', currentUserData)
    console.log('tripsData', tripsData)
    console.log('destinationsData', destinationsData)
  })
}