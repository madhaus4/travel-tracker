class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.allTrips = [];
  }

  findCurrentUserTrips(trips) {
    trips.filter(trip => {
      if (trip.userID === this.id) {
        this.allTrips.push(trip)
      } 
    })
    return this.allTrips 
  }

  findPastTrips(trips, date) {
    const userTrips = this.findCurrentUserTrips(trips)
    return userTrips.filter(trip => trip.date < date)
  }

  findPresentTrips(trips, date) {
    const userTrips = this.findCurrentUserTrips(trips)
    return userTrips.filter(trip => trip.date === date)
  }

  findUpcomingTrips(trips, date) {
    const userTrips = this.findCurrentUserTrips(trips)
    return userTrips.filter(trip => trip.date > date)
  }

  findPendingTrips(trips) {
    const userTrips = this.findCurrentUserTrips(trips)
    return userTrips.filter(trip => trip.status === 'pending')
  }
}


export default Traveler;