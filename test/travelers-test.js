import { expect } from 'chai';
import Travelers from '../src/Travelers.js';
// import Trips from './Trips.js';
import sampleTravelers from '../src/data/travelersData-sample.js';
// import sampleTrips from '../src/data/tripsData-sample.js';
// import sampleDestinations from '../src/data/destinationsData-sample.js';

describe('Travelers', () => {
  let traveler1, traveler2, traveler3;

  beforeEach(() => {
    traveler1 = new Travelers(sampleTravelers[0]);
    traveler2 = new Travelers(sampleTravelers[1]);
    traveler3 = new Travelers(sampleTravelers[2]);
  })

  it('it should be a function', () => {
    expect(Travelers).to.be.a('function');
  })
  
  it('it should be an instance of Travelers', () => {
    expect(traveler1).to.be.an.instanceOf(Travelers);
    expect(traveler2).to.be.an.instanceOf(Travelers);
    expect(traveler3).to.be.an.instanceOf(Travelers);
  })
});