import { expect } from 'chai';
import Trips from '../src/Trips.js';
import sampleTrips from '../src/data/tripsData-sample.js';
import sampleDestinations from '../src/data/destinationsData-sample.js';


describe('Trips', () => {
  let tripsData, currentTrip, date;

  beforeEach(() => {
    tripsData = new Trips(sampleTrips, sampleDestinations);
    currentTrip = new Trips(sampleTrips[3], sampleDestinations[1]);
    date = '2021/08/07';
  })

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  })

  it('should be an instance of Trips', () => {
    expect(tripsData).to.be.an.instanceOf(Trips);
  })

  it('should hold the data for all trips', () => {
    expect(tripsData.allTrips).to.deep.equal(sampleTrips);
  })

  it('should hold the data for all destinations', () => {
    expect(tripsData.allDestinations).to.deep.equal(sampleDestinations);
  })

  it('should hold data for a single trip', () => {
    expect(currentTrip).to.be.an.instanceOf(Trips);
  })

  it('should have a specific id for the trip', () => {
    expect(currentTrip.id).to.equal(22);
  })

  it('should have a specific travelers id', () => {
    expect(currentTrip.userID).to.equal(3);
  })

  it('should have a specific id for a destination', () => {
    expect(currentTrip.destinationID).to.equal(9);
  })

  it('should have an amount of travelers', () => {
    expect(currentTrip.travelers).to.equal(4);
  })

  it('should have a specific date', () => {
    expect(currentTrip.date).to.equal('2022/05/01');
  })

  it('should have a duration of the trip', () => {
    expect(currentTrip.duration).to.equal(19);
  })

  it('should have a trip status', () => {
    expect(currentTrip.status).to.equal('approved');
  })

  it('should have a way to hold suggested activities', () => {
    expect(currentTrip.suggestedActivities).to.deep.equal([])
  })

  describe('User Trips', () => {
    it('should have a way to access a single user', () => {
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

      expect(tripsData.findCurrentUserTrips(3)).to.deep.equal(currentUserTrips);
    })

    it('should have a way to find all of a user\'s past trips', () => {
      expect(tripsData.findPastTrips(3, date)).to.deep.equal([  
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

    it('should have a way to find all of a user\'s present trips', () => {
      expect(tripsData.findPresentTrips(3, date)).to.deep.equal([]);
    })

    it('should have a way to find all of a user\'s upcoming trips', () => {
      expect(tripsData.findUpcomingTrips(3, date)).to.deep.equal([  
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

    it('should have a way to find all of a user\'s pending trips', () => {
      expect(tripsData.findPendingTrips(3)).to.deep.equal([]);
    })
  })

  describe('Trip Costs', () => {
    it('should have a way to calculate the amount of a trip per person', () => {
      expect(tripsData.calculateTripCostPerPerson(3, 9)).to.equal(2850);
    })

    it('should have a way to calculate the amount of a trip for a group', () => {
      expect(tripsData.calculateTripCostForGroup(3, 9)).to.equal(54150);
    })
    
    it('should have a way to calculate the travel agent\'s 10% fee', () => {
      tripsData.calculateTripCostPerPerson(3, 9);
      tripsData.calculateTripCostForGroup(3, 9);

      expect(tripsData.calculateAgentFeePerPerson(3, 9)).to.equal(285);
      expect(tripsData.calculateAgentFeeForGroup(3, 9)).to.equal(5415);
    })

    it('should have a way to return the trip total with the agent\'s fee', () => {
      expect(tripsData.returnTripTotalPerPerson(3, 9)).to.equal(3135);
      expect(tripsData.returnTripTotalForGroup(3, 9)).to.equal(59565);
    })

    it('should have a way to calculate the amount a user spent on trips this year', () => {
      expect(tripsData.calculateTripsTotal(3, 9, 2020)).to.equal(6039);
    })
  })    
});