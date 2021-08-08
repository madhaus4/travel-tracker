import { expect } from 'chai';
import Traveler from '../src/Traveler.js';
import sampleTravelers from '../src/data/travelersData-sample.js';
import sampleTrips from '../src/data/tripsData-sample.js';
import sampleDestinations from '../src/data/destinationsData-sample.js';


describe('Travelers', () => {
  let traveler1, traveler2, traveler3;

  beforeEach(() => {
    traveler1 = new Traveler(sampleTravelers[0], sampleTrips, sampleDestinations);
    traveler2 = new Traveler(sampleTravelers[1]);
    traveler3 = new Traveler(sampleTravelers[2]);
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  })
  
  it('should be an instance of Travelers', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
    expect(traveler3).to.be.an.instanceOf(Traveler);
  })

  it('should have a traveler id', () => {
    expect(traveler1.id).to.equal(1);
  })

  it('should have a traveler name', () => {
    expect(traveler1.name).to.equal('Leila Thebeaud');
  })

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.equal('photographer');
  })

  it('should have a default value for all trips', () => {
    expect(traveler1.allTrips).to.deep.equal([]);
  })

  

});