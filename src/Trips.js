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


}


export default Trips;