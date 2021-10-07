DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name TEXT NOT NULL,
type TEXT NOT NULL,
extinct BOOLEAN 
);


CREATE TABLE animals(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
animal TEXT NOT NULL,
species_id BIGINT NOT NULL,
FOREIGN KEY (species_id) REFERENCES species(id),
diet TEXT NOT NULL
);

INSERT INTO species (name, type, extinct)
VALUES ('Canine', 'Mammal', false)
RETURNING *;

INSERT INTO animals (animal, diet, species_id)
VALUES ('Izzie', 'everything', 1)
RETURNING *