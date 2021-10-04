const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

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
        console.log('RESPONSE BODY AT POST TEST', res.body);
        expect(res.body).toEqual(
          {
            id: '1',
            name: 'Feline',
            type: 'Mammal',
            extinct: false
          });
      });
  });


  it('it gets all species from table', async () =>
  {
    return await request(app)
      .get('/api/species')
      .then((res) =>
      {
        console.log('RESPONSE BODY AT GET ALL SPECIES TEST', res.body);
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  afterAll(() => {
    pool.end();
  });
});
