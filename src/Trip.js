class Trip {
  constructor(currentTrip) {
    this.id = currentTrip.id;
    this.userID = currentTrip.userID;
    this.destinationID = currentTrip.destinationID;
    this.travelers = currentTrip.travelers;
    this.date = currentTrip.date;
    this.duration = currentTrip.duration;
    this.status = currentTrip.status;
    this.suggestedActivities = currentTrip.suggestedActivities;
  }

  findCurrentTrips(trips) {
    return trips.filter(trip => trip.userID === this.userID)
  }

  // TRIP COSTS METHODS
  calculateTripCostPerPerson(destination) {
    const tripCost = (destination.estimatedLodgingCostPerDay * this.duration) + destination.estimatedFlightCostPerPerson
    return tripCost
  }

  calculateTripCostForGroup(trip, destination) {
    const costPerPerson = this.calculateTripCostPerPerson(destination)
    const tripTotal = costPerPerson * trip.travelers
    return tripTotal
  }

  calculateAgentFeePerPerson(destination) {
    const initialTripCost = this.calculateTripCostPerPerson(destination)
    return initialTripCost * .10
  }

  calculateAgentFeeForGroup(trip, destination) {
    const initialTripCost = this.calculateTripCostForGroup(trip, destination)
    return initialTripCost * .10
  }

  returnTripTotalPerPerson(destination) {
    let total = this.calculateTripCostPerPerson(destination) + this.calculateAgentFeePerPerson(destination)
    return total
  }

  returnTripTotalForGroup(trip, destination) {
    let total = this.calculateTripCostForGroup(trip, destination) + this.calculateAgentFeeForGroup(trip, destination)
    return total
  }
}


export default Trip;