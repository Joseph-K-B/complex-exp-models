const pool = require('../utils/pool');


module.exports = class Species
{
    id;
    name;
    type;
    extinct; 

  constructor(row)
  {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.extinct = row.extinct;
  }
  
  
  ///---CREATE---///
  static async insert({ name, type, extinct })
  {
    const { rows } = await pool.query(
      `INSERT INTO species (name, type, extinct)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, type, extinct]
    );
    return new Species(rows[0]);
  }
  
  
  ///---RETRIEVE ALL---///
  static async getAll()
  {
    const { rows } = await pool.query(
      'SELECT * FROM species'
    );
    return rows.map(() => new Species(rows));
  }


  ///---RETRIEVE BY ID---///
  static async getId(id)
  {
    const { rows } = await pool.query(`
    SELECT * FROM species
    WHERE id = $1`, [id]
    );
    return new Species(rows[0]);
  }
};