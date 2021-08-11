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

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    pastTrips.classList.add('.yes-trip-wrapper')

    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          pastTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>
          `;
        }
      })
    })
  },

  renderNoPastTrips() {
    const pastTrips = document.getElementById('pastTrips')
    pastTrips.classList.add('.no-trip-wrapper')

    pastTrips.innerHTML = `
      <div>  
        <p>You do not have any past trips yet</p>
      </div>
    `;
  },

  renderPresentTrips(trips, destinations) {
    // const currentTripWrapper = document.getElementById('currentTrips')
    const presentTrips = document.getElementById('currentTripDetails')
    presentTrips.classList.add('.yes-trip-wrapper')
  
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          presentTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div
          `;
        }
      })
    })
  },

  renderNoPresentTrips() {
    // const currentTripWrapper = document.getElementById('currentTripWrapper')
    const presentTrips = document.getElementById('currentTripDetails')
    presentTrips.classList.add('.no-trip-wrapper')

    presentTrips.innerHTML = `
      <div>  
        <p>You're currently not on a trip</p>
      </div>
    `;
  },

  renderUpcomingTrips(trips, destinations) {
    const upcomingTrips = document.getElementById('upcomingTrips')
    upcomingTrips.classList.add('.yes-trip-wrapper')

    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          upcomingTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>  
          `;
        }
      })
    })
  },

  renderNoUpcomingTrips() {
    // const upcomingTripWrapper = document.getElementById('upcomingTripWrapper')
    const upcomingTrips = document.getElementById('upcomingTrips')
    upcomingTrips.classList.add('.no-trip-wrapper')

    upcomingTrips.innerHTML = `
      <div>  
        <p>You do not have any upcoming trips</p>
      </div>
    `;
  },

  renderPendingTrips(trips, destinations) {
    const pendingTrips = document.getElementById('pendingTrips')
    pendingTrips.classList.add('.yes-trip-wrapper')

    pendingTrips.innerHTML += ''
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          pendingTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>  
          `;
        }
      })
    })
  },

  renderNoPendingTrips() {
    // const pendingTripWrapper = document.getElementById('pendingTripWrapper')
    const pendingTrips = document.getElementById('pendingTrips')
    pendingTrips.classList.add('.no-trip-wrapper')

    pendingTrips.innerHTML = `
      <div>  
        <p>You do not have any pending trips</p>
      </div>
    `;
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
    tripPriceContainer.innerHTML += `
      <p>Thank you for your trip request to visit ${tripInfo.destinationsList}!  A roundtrip flight and ${tripInfo.currentTrip.duration} days for ${tripInfo.currentTrip.travelers} travelers totals: $<strong>${tripInfo.tripTotalCost}</strong>.</p>
      <button class="btns" id"requestTripBtn" type="submit">Request Trip</button>
    `;
  }
}


export default domUpdates;