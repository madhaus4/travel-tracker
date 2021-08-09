const domUpdates = {

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    destinations.forEach(destination => {
      // trips.forEach(trip => {
        pastTrips.innerHTML += `
          <h5>${destination.destination}</h5>
          <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
          <h6></h6>
        `;
      // })
    })
  },

  renderPresentTrips(trips, destinations) {
    const presentTrips = document.getElementById('currentTripDetails')
    destinations.forEach(destination => {
      // trips.forEach(trip => {
        presentTrips.innerHTML += `
          <h5>${destination.destination}</h5>
          <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
          <h6></h6>
        `;
      // })
    })
  },

  renderUpcomingTrips(trips, destinations) {
    const upcomingTrips = document.getElementById('upcomingTrips')
    destinations.forEach(destination => {
      // trips.forEach(trip => {
        upcomingTrips.innerHTML += `
          <h5>${destination.destination}</h5>
          <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
          <h6></h6>
        `;
      // })
    })
  },

  renderPendingTrips(trips, destinations) {
    const pendingTrips = document.getElementById('pendingTrips')
    destinations.forEach(destination => {
      // trips.forEach(trip => {
        pendingTrips.innerHTML += `
          <h5>${destination.destination}</h5>
          <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
          <h6></h6>
        `;
      // })
    })
  },

  renderDestinationsDataList(destinations) {
    const destinationsDataList = document.getElementById('destinationsList')
    destinations.forEach(destination => {
      destinationsDataList.innerHTML += `
        <option value="${destination.destination}">
      `;
    })
  },

  renderYearlyTripsTotal(total) {
    const yearlyTripsTotal = document.getElementById('yearlyTotal')
    yearlyTripsTotal.innerHTML = `
      <h1>You've spent $${total} on amazing experiences this year</h1>
    `;
  },

  renderTripPriceRequest(tripInfo) {
    const tripPriceContainer = document.getElementById('tripPriceContainer')
    tripPriceContainer.classList.remove('hidden')
    tripPriceContainer.innerHTML += `<p>Thank you for your trip request to visit ${tripInfo.destinationsList}!  A roundtrip flight and ${tripInfo.currentTrip.duration} days for ${tripInfo.currentTrip.travelers} travelers totals: $<strong>${tripInfo.tripTotalCost}</strong>.</p>`;
  },


}


export default domUpdates;