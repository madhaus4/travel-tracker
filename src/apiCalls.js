const retrieveTravelersData = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log('Error upon us'));
}

const retrieveCurrentUserData = () => {
  return fetch(`http://localhost:3001/api/v1/travelers/${8}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log('Error upon us'));
}

const retrieveTripsData = () => {
  return fetch('http://localhost:3001/api/v1/trips')
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log('Error upon us'));
}

const retrieveDestinationsData = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log('Error upon us'));
}

const getData = () => {
  return Promise.all([
    retrieveTravelersData(), 
    retrieveCurrentUserData(), 
    retrieveTripsData(), 
    retrieveDestinationsData()
  ]);
}


export default {getData};