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

  // USER TRIPS
  determineCurrentUserTrips(userID) {
    return this.allTrips.filter(trip => trip.userID === userID)
  }

  determinePastTrips(userID, date) {
    const userTrips = this.determineCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.date < date)
  }

  determinePresentTrips(userID, date) {
    const userTrips = this.determineCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.date === date)
  }

  determineUpcomingTrips(userID, date) {
    const userTrips = this.determineCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.date > date)
  }

  determinePendingTrips(userID, date) {
    const userTrips = this.determineCurrentUserTrips(userID)
    return userTrips.filter(trip => trip.status === 'pending')
  }

  // TRIP COSTS
  determineTripCostPerPerson(userID, destinationID) {
    const userTrips = this.determineCurrentUserTrips(userID)
    const currrentTrip = userTrips.find(trip => {
      if (trip.destinationID === destinationID) {
        return trip
      }
    })
    return this.allDestinations.reduce((num, place) => {
      if (place.id === destinationID) {
        num = (place.estimatedLodgingCostPerDay * currrentTrip.duration) + place.estimatedFlightCostPerPerson
      }
      return num
    }, 0)
  }

  determineTripCostForGroup(userID, destinationID) {
    const userTrips = this.determineCurrentUserTrips(userID)
    const costPerPerson = this.determineTripCostPerPerson(userID, destinationID)
    return userTrips.reduce((num, trip) => {
      if (trip.destinationID === destinationID) {
        num = trip.duration * costPerPerson
      }
      return num
    }, 0)
  }


  
}


export default Trips;