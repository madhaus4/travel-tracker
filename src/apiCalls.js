const retrieveTravelersData = () => {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Error upon us"));
}

const retrieveCurrentUserData = () => {
  return fetch(`http://localhost:3001/api/v1/travelers/${8}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Error upon us"));
}

const retrieveTripsData = () => {
  return fetch("http://localhost:3001/api/v1/trips")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Error upon us"));
}

const retrieveDestinationsData = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Error upon us"));
}

// const retrieveData = (path) => {
//   fetch(path)
//     .then(response => response.json())
//     .then(data => data)
//     .catch(err => console.log("Error upon us"));
// }

const updateData = (path, data) => {
  fetch(path, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
      .then(response => checkForErrors(response))
      .then(response => console.log(reponse))
      .catch(err => console.log("ERROR MSG FOR DEVS IN CONSOLE"))
}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error("Please make sure that all fields are filled out.")
  } else {
    return response.json()
  }
}

const requestData = {
  // getTravelersData: () => {
  //   retrieveData("http://localhost:3001/api/v1/travelers")
  // },

  // getCurrentUserData: (userID) => {
  //   retrieveData(`http://localhost:3001/api/v1/travelers/${userID}`)
  // },

  // getTripsData: () => {
  //   retrieveData("http://localhost:3001/api/v1/trips")
  // },

  // getDestinationsData: () => {
  //   retrieveData("http://localhost:3001/api/v1/destinations")
  // },

  updateTripsData: (data) => {
    updateData("http://localhost:3001/api/v1/trips", data);
  },

  updateDestinationsData: (data) => {
    updateData("http://localhost:3001/api/v1/destinations", data)
  }
}


const getData = () => {
  return Promise.all([
    retrieveTravelersData(), 
    retrieveCurrentUserData(), 
    retrieveTripsData(), 
    retrieveDestinationsData()
  ]);
}



export default {updateData, checkForError, requestData, getData};