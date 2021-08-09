import { expect } from 'chai';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js';
import sampleTravelers from '../src/data/travelersData-sample.js';
import sampleTrips from '../src/data/tripsData-sample.js';
import sampleDestinations from '../src/data/destinationsData-sample.js';


describe('Travelers', () => {
  let traveler1, traveler2, traveler3, date;

  beforeEach(() => {
    traveler1 = new Traveler(sampleTravelers[2]);
    traveler2 = new Traveler(sampleTravelers[1]);
    traveler3 = new Traveler(sampleTravelers[0]);
    currentTrip = new Trip()
    date = '2021/08/07';
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
    expect(traveler1.id).to.equal(3);
  })

  it('should have a traveler name', () => {
    expect(traveler1.name).to.equal('Lannie Heynel');
  })

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.equal('history buff');
  })

  it('should store all trips', () => {
    expect(traveler1.allTrips).to.deep.equal([]);
  })

  describe('User Trips', () => {
    it('should return all trips for a traveler', () => {
      const currentUserTrips = [  
        {
          id: 21,
          userID: 3,
          destinationID: 10,
          travelers: 1,
          date: '2022/01/28',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 22,
          userID: 3,
          destinationID: 9,
          travelers: 4,
          date: '2022/05/01',
          duration: 19,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 100,
          userID: 3,
          destinationID: 6,
          travelers: 6,
          date: '2020/3/28',
          duration: 10,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 142,
          userID: 3,
          destinationID: 39,
          travelers: 1,
          date: '2019/12/14',
          duration: 20,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 193,
          userID: 3,
          destinationID: 35,
          travelers: 1,
          date: '2020/11/09',
          duration: 19,
          status: 'approved',
          suggestedActivities: []
        }
      ]
      expect(traveler1.findCurrentUserTrips(sampleTrips, 3)).to.deep.equal(currentUserTrips)
      expect(traveler1.allTrips.length).to.equal(5);
    })

    it('should have a way to find all of a traveler\'s past trips', () => {
      expect(traveler1.findPastTrips(sampleTrips, 3, date)).to.deep.equal([  
        {
          id: 100,
          userID: 3,
          destinationID: 6,
          travelers: 6,
          date: '2020/3/28',
          duration: 10,
          status: 'approved',
          suggestedActivities: []
        },  
        {
          id: 142,
          userID: 3,
          destinationID: 39,
          travelers: 1,
          date: '2019/12/14',
          duration: 20,
          status: 'approved',
          suggestedActivities: []
        },  
        {
          id: 193,
          userID: 3,
          destinationID: 35,
          travelers: 1,
          date: '2020/11/09',
          duration: 19,
          status: 'approved',
          suggestedActivities: []
        }
      ]);
    })

    it('should have a way to find all of a traveler\'s present trips', () => {
      expect(traveler1.findPresentTrips(sampleTrips, date)).to.deep.equal([]);
    })

    it('should have a way to find all of a traveler\'s upcoming trips', () => {
      expect(traveler1.findUpcomingTrips(sampleTrips, date)).to.deep.equal([  
        {
          id: 21,
          userID: 3,
          destinationID: 10,
          travelers: 1,
          date: '2022/01/28',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 22,
          userID: 3,
          destinationID: 9,
          travelers: 4,
          date: '2022/05/01',
          duration: 19,
          status: 'approved',
          suggestedActivities: []
        }
      ]);
    })

    it('should have a way to find all of a traveler\'s pending trips', () => {
      expect(traveler1.findPendingTrips(sampleTrips, 3)).to.deep.equal([]);
    })
  })


});