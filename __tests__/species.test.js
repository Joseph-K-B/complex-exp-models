/* eslint-disable no-unused-vars */
const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Species = require('../lib/models/Species.js');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });



  it('posts new species to table', async() =>
  {
    return await request(app)
      .post('/api/species')
      .send(
        {
          name: 'Feline',
          type: 'Mammal',
          extinct: false
        }
      ).then(res =>
      {
        // console.log('RESPONSE BODY AT POST TEST', res.body);
        expect(res.body).toEqual(
          {
            id: '2',
            name: 'Feline',
            type: 'Mammal',
            extinct: false
          });
      });
  });


  it('it gets all species from table', async () =>
  {
    const species1 = await Species.insert(
      {
        name: 'Feline',
        type: 'Mammal',
        extinct: false
      });
    const species2 = await Species.insert({
      name: 'Bear',
      type: 'Mammal',
      extinct: false
    });

    return await request(app)
      .get('/api/species')
      .then((res) =>
      {
        // console.log('RESPONSE BODY AT GET ALL SPECIES TEST', res.body);
        expect(res.body).toEqual(expect.any(Array));
      });
  });



  it('it gets species by id from table', async () =>
  {
    const species1 = await Species.insert({
      name: 'Feline',
      type: 'Mammal',
      extinct: false
    });
    const species3 = await Species.insert({
      name: 'Bear',
      type: 'Mammal',
      extinct: false
    });

    return await request(app)
      .get('/api/species/2')
      .then((res) =>
      {
        // console.log('RESPONSE BODY AT GET ID SPECIES TEST', res.body);
        expect(res.body).toEqual( 
          {
            id: '2',
            name: 'Feline',
            type: 'Mammal',
            extinct: false
          });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
