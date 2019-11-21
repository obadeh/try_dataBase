DROP TABLE IF EXISTS people;

CREATE TABLE IF NOT EXISTS people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(256),
    last_name VARCHAR(256)
);

INSERT INTO people (first_name,last_name) VALUES('omar','sami');