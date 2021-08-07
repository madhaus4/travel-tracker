import { expect } from 'chai';
import Traveler from '../src/Traveler.js';
import sampleTravelers from '../src/data/travelersData-sample.js';

describe('Travelers', () => {
  let traveler1, traveler2, traveler3;

  beforeEach(() => {
    traveler1 = new Traveler(sampleTravelers[0]);
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
});