class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.allTrips = [];
    this.pastTrips = [];
    this.presentTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  findCurrentUserTrips(trips, id) {
    trips.filter(trip => {
      if (trip.userID === id) {
        this.allTrips.push(trip)
      } 
    })
    return this.allTrips 
  }

  findPastTrips(date) {
    this.allTrips.filter(trip => {
      if (trip.date < date) {
        this.pastTrips.push(trip)
      }
    })
    return this.pastTrips;
  }

  findPresentTrips(date) {
    this.allTrips.filter(trip => {
      if (trip.date === date) {
        this.presentTrips.push(trip)
      }
    })
    return this.presentTrips;
  }

  findUpcomingTrips(date) {
    this.allTrips.filter(trip => {
      if (trip.date > date) {
        this.upcomingTrips.push(trip)
      }
    })
    return this.upcomingTrips;
  }

  findPendingTrips() {
    this.allTrips.filter(trip => {
      if (trip.status === 'pending' && !this.pendingTrips.includes(trip)) {
        this.pendingTrips.push(trip)
      }
    })
    return this.pendingTrips;
  }
}


export default Traveler;