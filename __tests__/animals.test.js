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
    testSpecies.map(async (species) => {
      await request(app).post('/api/species').send(species);
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
    testAnimals.map(async (animals) => {
      await request(app).post('/api/animals').send(animals);
    })
  );
}



describe('animal table routes', () => {
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
        expect(res.body).toEqual([
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
        ]);
      });
  });



  it('it gets all animals & their species from table', async () =>
  {
    await saveSpecies();
    await saveAnimals();

    return await request(app)
      .get('/api/animalSpecies')
      .then((res) =>
      {
        console.log('RESPONSE BODY AT GET ALL ANIMALS & SPECIES TEST', res.body);
        expect(res.body).toEqual(
          [
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
          ]
        );
      });
  });

  afterAll(() => {
    pool.end();
  });
});
