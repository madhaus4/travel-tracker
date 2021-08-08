class Trip {
  constructor(currentTrip) {
    // this.allTrips = currentTrip;
    // this.allDestinations = allDestinations;
    this.id = currentTrip.id;
    this.userID = currentTrip.userID;
    this.destinationID = currentTrip.destinationID;
    this.travelers = currentTrip.travelers;
    this.date = currentTrip.date;
    this.duration = currentTrip.duration;
    this.status = currentTrip.status;
    this.suggestedActivities = currentTrip.suggestedActivities;
  }

  // USER TRIPS METHODS
  findCurrentUserTrips(userID) {
    let userTrips = currentTraveler.findCurrentUserTrips(userID)
    // console.log(userTrips)
    // return this.allTrips.filter(trip => trip.userID === userID)
    return userTrips
  }

  // findPastTrips(userID, date) {
  //   const userTrips = this.findCurrentUserTrips(userID)
  //   return userTrips.filter(trip => trip.date < date)
  // }

  // findPresentTrips(userID, date) {
  //   const userTrips = this.findCurrentUserTrips(userID)
  //   return userTrips.filter(trip => trip.date === date)
  // }

  // findUpcomingTrips(userID, date) {
  //   const userTrips = this.findCurrentUserTrips(userID)
  //   return userTrips.filter(trip => trip.date > date)
  // }

  // findPendingTrips(userID) {
  //   const userTrips = this.findCurrentUserTrips(userID)
  //   return userTrips.filter(trip => trip.status === 'pending')
  // }

  // TRIP COSTS METHODS
  calculateTripCostPerPerson(userID, destinationID) {
    const userTrips = this.findCurrentUserTrips(userID)
    const currentTrip = userTrips.find(trip => {
      if (trip.destinationID === destinationID) {
        return trip
      }
    })
    let total = this.allDestinations.reduce((num, place) => {
      if (place.id === destinationID) {
        num = (place.estimatedLodgingCostPerDay * currentTrip.duration) + place.estimatedFlightCostPerPerson
      }
      return num
    }, 0)
    return total
  }

  calculateTripCostForGroup(userID, destinationID) {
    const userTrips = this.findCurrentUserTrips(userID)
    const costPerPerson = this.calculateTripCostPerPerson(userID, destinationID)
    return userTrips.reduce((num, trip) => {
      if (trip.destinationID === destinationID) {
        num = trip.duration * costPerPerson
      }
      return num
    }, 0)
  }

  calculateAgentFeePerPerson(userID, destinationID) {
    const initialTripCost = this.calculateTripCostPerPerson(userID, destinationID)
    return initialTripCost * .10
  }

  calculateAgentFeeForGroup(userID, destinationID) {
    const initialTripCost = this.calculateTripCostForGroup(userID, destinationID)
    return initialTripCost * .10
  }

  returnTripTotalPerPerson(userID, destinationID) {
    return this.calculateTripCostPerPerson(userID, destinationID) + this.calculateAgentFeePerPerson(userID, destinationID)
  }

  returnTripTotalForGroup(userID, destinationID) {
    return this.calculateTripCostForGroup(userID, destinationID) + this.calculateAgentFeeForGroup(userID, destinationID)
  }

  calculateYearlyTripsTotal(userID, destinationID, year) {
    const userTrips = this.findCurrentUserTrips(userID)
    let dates = []
    userTrips.forEach(trip => {
      if (trip.date.includes(year)) {
        dates.push(trip)
      }
    })

    return dates.reduce((num, date) => {
      if (date.destinationID) {
        destinationID = date.destinationID 
        num += this.returnTripTotalPerPerson(userID, destinationID)
      }
      return num
    }, 0)
  }

}


export default Trip;