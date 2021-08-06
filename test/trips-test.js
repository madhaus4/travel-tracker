import { expect } from 'chai';
import Travelers from '../src/Travelers.js';
import Trips from '../src/Trips.js';
import sampleTravelers from '../src/data/travelersData-sample.js';
import sampleTrips from '../src/data/tripsData-sample.js';
import sampleDestinations from '../src/data/destinationsData-sample.js';


describe('Trips', () => {
  let allTrips;

  beforeEach(() => {
    allTrips = new Trips(sampleTrips);
  });

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  })

  it('should be an instance of Trips', () => {
    expect(allTrips).to.be.an.instanceOf(Trips)
  })
});