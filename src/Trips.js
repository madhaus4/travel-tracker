class Trips {
  constructor(tripData, allDestinations) {
    this.allTrips = tripData;
    this.allDestinations = allDestinations;
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
  }

  // USER TRIPS METHODS
  findCurrentUserTrips(userID) {
    return this.allTrips.filter(trip => trip.userID === userID)
  }

  findPastTrips(userID, date) {
    const userTrips = this.findCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.date < date)
  }

  findPresentTrips(userID, date) {
    const userTrips = this.findCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.date === date)
  }

  findUpcomingTrips(userID, date) {
    const userTrips = this.findCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.date > date)
  }

  findPendingTrips(userID, date) {
    const userTrips = this.findCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.status === 'pending')
  }

  // TRIP COSTS METHODS
  calculateTripCostPerPerson(userID, destinationID) {
    const userTrips = this.findCurrentUserTrips(userID)
    const currrentTrip = userTrips.find(trip => {
      if (trip.destinationID === destinationID) {
        return trip
      }
    })
    let total = this.allDestinations.reduce((num, place) => {
      if (place.id === destinationID) {
        num = (place.estimatedLodgingCostPerDay * currrentTrip.duration) + place.estimatedFlightCostPerPerson
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
}


export default Trips;