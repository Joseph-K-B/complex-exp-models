const pool = require('../utils/pool');


module.exports = class Animals
{
    id;
    animal;
    diet;
    species_id;

    constructor (row)
    {
        this.id = row.id;
        this.animal = row.animal;
        this.diet = row.diet;
        this.speciesId = row. species_id;
    }


    ///---CREATE---///
    static async insert({ animal, diet, speciesId })
    {
        const { rows } = await pool.query(
            `INSERT INTO animals(animal, diet, species_id)
            VALUES( $1, $2, $3)
            RETURNING *`,
            [animal, diet, speciesId]
        );
        return new Animals(rows[0]);
    }


    ///---RETRIEVE ALL---///
    static async getAll()
    {
        const { rows } = await pool.query(
            'SELECT * FROM animals'
        );
        return rows.map(() => new Animals(rows));
    }



    ///---RETRIEVE BY ID---///
    static async getId()
    {
        const  { rows } = await pool.query(`
        SELECT * FROM animals
        WHERE id = $1`, [id]
        );
        return new Animals(rows[0])
    }


    ///---RETRIEVE ALL ANIMALS W/ SPECIES---///
    static async animalSpecies()
    {
        const { rows } = await pool.query(`
        SELECT * FROM animals
        LEFT JOIN species
        ON animals.species_id = species.id`)
    }
}