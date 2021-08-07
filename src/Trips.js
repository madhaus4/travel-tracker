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
    return this.allTrips.filter(trip => trip.userID === userID && trip.date < date)
  }

  determindPresentTrips(userID, date) {}

  determineUpcomingTrips(userID, date) {}

  determinePendingTrips(userID, date) {}


}


export default Trips;