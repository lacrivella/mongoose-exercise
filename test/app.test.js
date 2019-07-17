require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const People = require('../lib/models/People');

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
  
  it('GET all people', async() => {
    const people = await People.create({ name: 'leigh-ann', email: 'la@fake.com' });
    return request(app)
      .get('/api/v1/peoples')
      .then(res => {
        const peopleJSON = JSON.parse(JSON.stringify(people));
        expect(res.body).toEqual([peopleJSON]);
      });
  });

  it('GET by id', async() => {
    const people = await People.create({ name: 'leigh-ann', email: 'la@fake.com' });
    return request(app)
      .get(`/api/v1/peoples/${people._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'leigh-ann',
          email: 'la@fake.com',
          __v: 0
        });
      });
  });
  it('PUT updated person', async() => {
    const people = await People.create({ 
      name: 'leigh-ann',
      email: 'la@fake.com'
    });

    return request(app)
      .put(`/api/v1/peoples/${people._id}`)
      .send({
        name: 'lili',
        email: 'lili@fake.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'lili',
          email: 'lili@fake.com',
          __v: 0
        });
      });
  });
});
