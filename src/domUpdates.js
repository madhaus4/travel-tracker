const domUpdates = {

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    destinations.forEach(destination => {
      pastTrips.innerHTML += `
        <h5>${destination.destination}</h5>
        <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
        <h6></h6>
      `;
    })
  },

  renderPresentTrips(trips, destinations) {
    const presentTrips = document.getElementById('currentTripDetails')
    destinations.forEach(destination => {
      presentTrips.innerHTML += `
        <h5>${destination.destination}</h5>
        <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
        <h6></h6>
      `;
    })
  },

  renderUpcomingTrips(trips, destinations) {
    const upcomingTrips = document.getElementById('upcomingTrips')
    destinations.forEach(destination => {
      upcomingTrips.innerHTML += `
        <h5>${destination.destination}</h5>
        <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
        <h6></h6>
      `;
    })
  },

  renderPendingTrips(trips, destinations) {
    const pendingTrips = document.getElementById('pendingTrips')
    destinations.forEach(destination => {
      pendingTrips.innerHTML += `
        <h5>${destination.destination}</h5>
        <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
        <h6></h6>
      `;
    })
  },

  renderDestinationsDataList(destinations) {
    const destinationsDataList = document.getElementById('destinationsList')
    destinations.forEach(destination => {
      destinationsDataList.innerHTML += `
        <option value="${destination.destination}">
      `;
    })
  }


}


export default domUpdates;