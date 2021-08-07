import { expect } from 'chai';
// import Travelers from '../src/Travelers.js';
// import sampleTravelers from '../src/data/travelersData-sample.js';
import Trips from '../src/Trips.js';
import sampleTrips from '../src/data/tripsData-sample.js';
import sampleDestinations from '../src/data/destinationsData-sample.js';


describe('Trips', () => {
  let tripsData, currentTrip;

  beforeEach(() => {
    tripsData = new Trips(sampleTrips, sampleDestinations);
    currentTrip = new Trips(sampleTrips[3], sampleDestinations[1]);
    // console.log('sampleTrips', sampleTrips)
    // console.log('currentTrip', currentTrip)
  });

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  })

  it('should be an instance of Trips', () => {
    expect(tripsData).to.be.an.instanceOf(Trips)
  })

  it('should hold the data for all trips', () => {
    expect(tripsData.allTrips).to.deep.equal(sampleTrips)
  })

  it('should hold the data for all destinations', () => {
    expect(tripsData.allDestinations).to.deep.equal(sampleDestinations)
  })

  it('should hold data for a single trip', () => {
    expect(currentTrip).to.be.an.instanceOf(Trips);
  })

  it('should have a specific id for the trip', () => {
    expect(currentTrip.id).to.equal(22)
  })

  it('should have a specific travelers id', () => {
    expect(currentTrip.userID).to.equal(3)
  })

  it('should have a specific id for a destination', () => {
    expect(currentTrip.destinationID).to.equal(9)
  })

  it('should have an amount of travelers', () => {
    expect(currentTrip.travelers).to.equal(4)
  })

  it('should have a specific date', () => {
    expect(currentTrip.date).to.equal('2022/05/01')
  })

  it('should have a duration of the trip', () => {
    expect(currentTrip.duration).to.equal(19)
  })

  it('should have a trip status', () => {
    expect(currentTrip.status).to.equal('approved')
  })

  // it('should have a way to hold suggested activities', () => {
  //   console.log(currentTrip)
  //   expect(currentTrip.suggestedActivities).to.equal([])
  // })


  it('should have a way to find all of a user\'s past trips', () => {
    expect(tripsData.determinePastTrips()).to.deep.equal()
  })

  it('should have a way to find all of a user\'s present trips', () => {
    expect(tripsData.determinePresentTrips()).to.deep.equal()
  })

  it('should have a way to find all of a user\'s upcoming trips', () => {
    expect(tripsData.determineUpcomingTrips()).to.deep.equal()
  })

  it('should have a way to find all of a user\'s pending trips', () => {
    expect(tripsData.determinePendingTrips()).to.deep.equal()
  })




});