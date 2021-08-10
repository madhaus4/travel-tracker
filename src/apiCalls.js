const retrieveData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(err => displayErrorMessage(err));
}

const updateData = (data) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(response => checkForErrors(response))
    .then(data => {
      return data
    })
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


export default {retrieveData, updateData};