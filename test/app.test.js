require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('POST a new person', () => {
    return request(app)
      .post('/api/v1/peoples')
      .send({ name: 'leigh-ann', email: 'la@fake.com' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'leigh-ann',
          email: 'la@fake.com',
          __v: 0
        });
      });
  }); 
});
