const domUpdates = {

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    destinations.forEach(destination => {
      pastTrips.innerHTML += `
      <h5>${destination.destination}</h5>
      <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
      <h6></h6>
      `;
    })
  },

  // renderPresentTrips() {},
  renderUpcomingTrips(trips, destinations) {
    const upcomingTrips = document.getElementById('upcomingTrips')
    destinations.forEach(destination => {
      upcomingTrips.innerHTML += `
        <h5>${destination.destination}</h5>
        <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
        <h6></h6>
        `;
    })
  },

  renderPendingTrips(trips, destinations) {
    const pendingTrips = document.getElementById('pendingTrips')
    destinations.forEach(destination => {
      pendingTrips.innerHTML += `
        <h5>${destination.destination}</h5>
        <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
        <h6></h6>
        `;
    })
  }


}


export default domUpdates;