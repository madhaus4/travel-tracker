const domUpdates = {

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    destinations.forEach(destination => {
      pastTrips.innerHTML += `
      <h5>${destination.destination}</h5>
      <img src=${destination.image} alt=${destination.alt}>
      <h6></h6>
      `;
    })
  },

  // renderPresentTrips() {},
  // renderUpcomingTrips() {},
  // renderPendingTrips() {}


}


export default domUpdates;