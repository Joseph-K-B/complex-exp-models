const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
// const Animals = require('../lib/models/Animals.js');

async function saveSpecies() 
{
  const testSpecies = [
    {
      name: 'Feline',
      type: 'Mammal',
      extinct: false,
    },
    {
      name: 'Bear',
      type: 'Mammal',
      extinct: false,
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
      speciesId: '2'
    },
    {
      animal: 'Polar Bear',
      diet: 'carnivore',
      speciesId: '3'
    },
    {
      animal: 'Arctic Wolf',
      diet: 'carnivore',
      speciesId: '1'
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
  

  it('posts new animal to table', async () => {
    await saveSpecies();
    return request(app)
      .post('/api/animals')
      .send(
        {
          animal: 'Siberian Tiger',
          diet: 'carnivore',
          speciesId: '2'
        }
      ).then(res =>
      {
        expect(res.body).toEqual(
          {
            id: '2',
            animal: 'Siberian Tiger',
            diet: 'carnivore',
            speciesId: '2'
          });
      });
  });


  it('it gets animal by id from table', async () =>
  {
    await saveSpecies();
    await saveAnimals();

    return await request(app)
      .get('/api/animals/3')
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: '3',
            animal: expect.any(String),
            diet: expect.any(String),
            speciesId: expect.any(String)
          }
        );
      });
  });

  it('it gets all animals & their species from table', async () => {
    await saveSpecies();
    await saveAnimals();

    return await request(app)
      .get('/api/animals')
      .then((res) => {
        expect(res.body).toEqual(
          [
            {
              id: expect.any(String),
              animal: expect.any(String),
              diet: expect.any(String),
              species_id: expect.any(String),
              name: expect.any(String),
              type: expect.any(String),
              extinct: false


            },
            {
              id: expect.any(String),
              animal: expect.any(String),
              diet: expect.any(String),
              species_id: expect.any(String),
              name: expect.any(String),
              type: expect.any(String),
              extinct: false
            },
            {
              id: expect.any(String),
              animal: expect.any(String),
              diet: expect.any(String),
              species_id: expect.any(String),
              name: expect.any(String),
              type: expect.any(String),
              extinct: false
            },
            {
              id: expect.any(String),
              animal: expect.any(String),
              diet: expect.any(String),
              species_id: expect.any(String),
              name: expect.any(String),
              type: expect.any(String),
              extinct: false
            }

          ]);
      });
  });


  it('updates animal by id', async () => {
    await saveSpecies();
    await saveAnimals();

    return request(app)
      .patch('/api/animals/1')
      .send(
        {
          id: '1',
          animal: 'Izzie the dog',
          diet: 'anything',
          speciesId: '1'
        }
      )
      .then((res) =>
      {
        expect(res.body).toEqual(
          {
            id: '1',
            animal: 'Izzie the dog',
            diet: 'anything',
            speciesId: '1'
          }
        );
      });
  });
      
 
  it('deletes animal from table', async() => {
    await saveSpecies();
    await saveAnimals();

    const res = await request(app)
      .delete('/api/animals/4');
    expect (res.body).toEqual({});
  });



  it('counts the number of animals ordered by species', async() => {
    await saveSpecies();
    await saveAnimals();

    return request(app)
      .get('/api/animals/count')
      .then((res) => {
        expect(res.body).toEqual([
          {
            name:'Canine',
            count: '2'
          },
          {
            name:'Feline',
            count: '1'
          },
          {
            name:'Bear',
            count: '1'
          }
        ]);
      });      
  });


  afterAll(() => {
    pool.end();
  });
});

