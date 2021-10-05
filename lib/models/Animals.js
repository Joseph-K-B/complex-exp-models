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
}