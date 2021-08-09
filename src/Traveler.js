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

  // MOVED FROM TRIPS > NEED TO TEST
  calculateYearlyTripsTotal(year, destinations) {
    let dates = []
    this.allTrips.forEach(trip => {
      if (trip.date.includes(year)) {
        dates.push(trip)
      }
    })
    let total;
    return destinations.reduce((num, destination) => {
      dates.forEach(date => {
        if (destination.id === date.destinationID) {
          total = (destination.estimatedLodgingCostPerDay * date.duration) + destination.estimatedFlightCostPerPerson
        }
        num = total
      })
      return num;
    }, 0)
  }
}


export default Traveler;