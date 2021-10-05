const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Animals = require('../lib/models/Animals.js');

async function saveSpecies() {
  const testSpecies = [
    {
      name: 'Feline',
      type: 'Mammal',
      extinct: false
    },
    {
      name: 'Canine',
      type: 'Mammal',
      extinct: false
    },
    {
      name: 'Bear',
      type: 'Mammal',
      extinct: false
    },
  ];
  await Promise.all(
    testSpecies.map(async (user) => {
      await request(app).post('/api/species').send(user);
    })
  );
}


async function saveAnimals() {
  const testAnimals = [
    {
      animal: 'Siberian Tiger',
      diet: 'carnivore',
      species_id: '1'
    },
    {
      animal: 'Polar Bear',
      diet: 'carnivore',
      species_id: '3'
    },
    {
      animal: 'Arctic Wolf',
      diet: 'carnivore',
      species_id: '2'
    },
  ];
  await Promise.all(
    testAnimals.map(async (user) => {
      await request(app).post('/api/animals').send(user);
    })
  );
}



describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts new animal to table', async() =>
  {
    return await request(app)
      .post('/api/animals')
      .send(
        {
          animal: 'Siberian Tiger',
          diet: 'carnivore',
          speciesId: '2'
        }
      ).then(res =>
      {
        console.log('RESPONSE BODY AT POST TEST', res.body);
        expect(res.body).toEqual(
          {
            id: '1',
            animal: 'Siberian Tiger',
            diet: 'carnivore',
            speciesId: '2'
          });
      });
  });




  it('it gets all animals from table', async () =>
  {
    await saveSpecies();
    await saveAnimals();

    return await request(app)
      .get('/api/animals')
      .then((res) =>
      {
        console.log('RESPONSE BODY AT GET ALL ANIMALS TEST', res.body);
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  afterAll(() => {
    pool.end();
  });
});
