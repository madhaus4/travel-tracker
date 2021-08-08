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
  findCurrentTrips(trips) {
    let userTrips = trips.filter(trip => trip.userID === this.userID)
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
  calculateTripCostPerPerson(trips, destinations) {
    const userTrips = this.findCurrentTrips(trips)
    const currentTrip = userTrips.find(trip => {
      if (trip.destinationID === this.destinationID) {
        return trip
      }
    })
    let total = destinations.reduce((num, place) => {
      if (place.id === this.destinationID) {
        num = (place.estimatedLodgingCostPerDay * currentTrip.duration) + place.estimatedFlightCostPerPerson
      }
      return num
    }, 0)
    return total
  }

  calculateTripCostForGroup(trips, destinations) {
    const userTrips = this.findCurrentTrips(trips)
    const costPerPerson = this.calculateTripCostPerPerson(trips, destinations)
    return userTrips.reduce((num, trip) => {
      if (trip.destinationID === this.destinationID) {
        num = trip.duration * costPerPerson
      }
      return num
    }, 0)
  }

  calculateAgentFeePerPerson(trips, destinations) {
    const initialTripCost = this.calculateTripCostPerPerson(trips, destinations)
    return initialTripCost * .10
  }

  calculateAgentFeeForGroup(trips, destinations) {
    const initialTripCost = this.calculateTripCostForGroup(trips, destinations)
    return initialTripCost * .10
  }

  returnTripTotalPerPerson(trips, destinations) {
    return this.calculateTripCostPerPerson(trips, destinations) + this.calculateAgentFeePerPerson(trips, destinations)
  }

  returnTripTotalForGroup(trips, destinations) {
    return this.calculateTripCostForGroup(trips, destinations) + this.calculateAgentFeeForGroup(trips, destinations)
  }

  calculateYearlyTripsTotal(trips, destinations, year) {
    const userTrips = this.findCurrentTrips(trips)
    let dates = []
    userTrips.forEach(trip => {
      if (trip.date.includes(year)) {
        dates.push(trip)
      }
    })

    return dates.reduce((num, date) => {
      if (date.destinationID) {
        this.destinationID = date.destinationID 
        num += this.returnTripTotalPerPerson(trips, destinations)
      }
      return num
    }, 0)
  }

}


export default Trip;