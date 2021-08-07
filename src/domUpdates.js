const domUpdates = {

  renderPastTrips(trips) {
    const pastTrips = document.getElementById('pastTrips')
    trips.forEach(trip => {
      pastTrips.innerHTML += `
      <h5>${trip.destination}</h5>
      <img src=${trip.image} alt=${trip.alt}>
      <h6></h6>
      `;
    })
  }


}


export default domUpdates;