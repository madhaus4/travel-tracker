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
    return (destination.estimatedLodgingCostPerDay * this.duration) + destination.estimatedFlightCostPerPerson
  }

  calculateTripCostForGroup(trip, destination) {
    const costPerPerson = this.calculateTripCostPerPerson(destination)
    const tripTotal = costPerPerson * trip.travelers
    return tripTotal
  }

  calculateAgentFeePerPerson(trip, destination) {
    const initialTripCost = this.calculateTripCostPerPerson(trip, destination)
    return initialTripCost * .10
  }

  calculateAgentFeeForGroup(trip, destination) {
    const initialTripCost = this.calculateTripCostForGroup(trip, destination)
    return initialTripCost * .10
  }

  returnTripTotalPerPerson(trip, destination) {
    return this.calculateTripCostPerPerson(trip, destination) + this.calculateAgentFeePerPerson(trip, destination)
  }

  returnTripTotalForGroup(trip, destination) {
    return this.calculateTripCostForGroup(trip, destination) + this.calculateAgentFeeForGroup(trip, destination)
  }
}


export default Trip;