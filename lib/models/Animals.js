const pool = require('../utils/pool');


module.exports = class Animals
{
  id;
  animal;
  diet;
  speciesId;

  constructor (row) {
    this.id = row.id;
    this.animal = row.animal;
    this.diet = row.diet;
    this.speciesId = row.species_id;
  }


  ///---CREATE---///
  static async insert({  animal, diet, speciesId })
  {
    const { rows } = await pool.query(
      `INSERT INTO animals (animal, diet, species_id)
        VALUES( $1, $2, $3)
        RETURNING *`,
      [animal, diet, speciesId]
    );
    return new Animals(rows[0]);
  }


  ///---RETRIEVE BY ID---///
  static async getId(id) {
    const { rows } = await pool.query(`
        SELECT * FROM animals
        WHERE id = ($1)`, [id]
    );
    return new Animals(rows[0]);
  }


  ///---RETRIEVE ALL ANIMALS W/ SPECIES---///
  static async animalSpecies() {
    const { rows } = await pool.query(`
    SELECT *
    FROM animals
    LEFT JOIN species
    ON animals.species_id = species.id`);
    return rows;
  }



  ///---UPDATE BY ID---///
  static async update({ animal, diet, speciesId }) {
    const{ rows } = await pool.query(
      `UPDATE animals
      SET
      animal = $1,
      diet = $2,
      species_id = $3
      RETURNING *`,
      [animal, diet, speciesId]
    );
    return new Animals(rows[0]);
  }



  ///---REMOVE BY ID---///
  static async remove(id) {
    const { rows } = await pool.query(
      'DELETE FROM animals WHERE id = $1', [id]
    );
    return rows[0];
  }



  ///---COUNT ANIMALS ORDERED BY SPECIES---///
  static async countAnimals() {
    const  { rows } = await pool.query(
      `SELECT species.name, count(animals.id)
      FROM animals
      RIGHT JOIN species
      ON animals.species_id = species.id
      GROUP BY species.id
      ORDER BY species.id;
      `)
    console.log('COUNT AT ANIMAL MODEL', rows.body);
    // console.log('AT COUNT ANIMALS',  rows.map(row => new Animals(row)));
    return rows;
    // return new Animals(rows[0])
    // return rows.json();
    // return rows.map(row => new Animals(row))
  }
};

// static async count() {
//   const { rows } = await pool.query(
//     `SELECT animal, COUNT(id)
//     FROM animals`)
//   console.log('COUNT AT ANIMAL MODEL', rows);
  // console.log('AT COUNT ANIMALS',  rows.map(row => new Animals(row)));
  // return rows.json();
  // return rows.map(row => new Animals(row))
  // }
// };


