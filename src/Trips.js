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
    // this.suggestedActivities = []
    // console.log(this.allTrips )
  }

  determinePastTrips() {}

  determindPresentTrips() {}

  determineUpcomingTrips() {}

  determinePendingTrips() {}


}


export default Trips;