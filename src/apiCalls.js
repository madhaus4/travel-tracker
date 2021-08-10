
// const apiCalls = {

// retrieveData(path) {
//   fetch(path)
//     .then(response => response.json())
//     .then(data => data)
//     .catch(err => displayErrorMessage(err));
//   },

// }


// export default apiCalls;



const retrieveTravelersData = () => {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Error upon us"));
}


const retrieveCurrentUserData = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
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

const updateData = (data) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
      .then(response => checkForErrors(response))
      .then(response => console.log(reponse))
      .catch(err => displayErrorMessage(err))
}

const displayErrorMessage = (error) => {
  const errorField = document.querySelector(".js-error")
  const message = 
    error.message === "Failed to fetch" ? "Something went wrong, please check your internet" : error.message
  errorField.innerText = message  
}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error("Please make sure that all fields are filled out.")
  } else {
    return response.json()
  }
}

// const requestData = {
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

  // updateTripsData: (data) => {
  //   updateData("http://localhost:3001/api/v1/trips", data);
  // }
// }


const getData = (id) => {
  return Promise.all([
    retrieveTravelersData(), 
    retrieveCurrentUserData(id), 
    retrieveTripsData(), 
    retrieveDestinationsData()
  ]);
}



export default {updateData, checkForError, getData};