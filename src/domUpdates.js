const domUpdates = {

  renderLoginFailedMsg() {
    const incorrectLoginInfo = document.getElementById('incorrectLoginInfo')
    incorrectLoginInfo.classList.remove('hidden')
    incorrectLoginInfo.innerHTML = `Please enter a valid username and password`;
  },

  renderMainPage() {
    const loginPage = document.getElementById('loginPage')
    const mainPage = document.getElementById('mainContainer')
    const tripContainer = document.getElementById('tripContainer')
    loginPage.classList.add('hidden')
    mainPage.classList.remove('hidden')
    tripContainer.classList.remove('hidden')
  },

  renderWelcomeMsg(name) {
    const welcomeMsg = document.querySelector('.main-title')
    welcomeMsg.innerHTML = `
      <h3>Let's Explore this Beautiful World</h3>
      <p><span>${name},</span> You Ready?</p>
    `;
  },

  // renderNoTripsMsg(trip) {
  //   `You do not have any past trips yet`
  //   `You're currently not on a trip`
  //   `You do not have any upcoming trips`
  //   `You do not have any pending trips`
  // },

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          pastTrips.innerHTML += `
            <div class="destination-containers">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>
          `;
        }
      })
    })
  },

  renderPresentTrips(trips, destinations) {
    const presentTrips = document.getElementById('currentTripDetails')
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          presentTrips.innerHTML += `
            <div class="destination-containers">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div
          `;
        }
      })
    })
  },

  renderUpcomingTrips(trips, destinations) {
    const upcomingTrips = document.getElementById('upcomingTrips')
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          upcomingTrips.innerHTML += `
            <div class="destination-containers">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>  
          `;
        }
      })
    })
  },

  renderPendingTrips(trips, destinations) {
    const pendingTrips = document.getElementById('pendingTrips')
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          pendingTrips.innerHTML += `
            <div class="destination-containers">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>  
          `;
        }
      })
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
  }
}


export default domUpdates;