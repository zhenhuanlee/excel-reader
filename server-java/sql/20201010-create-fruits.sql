DROP TABLE IF EXISTS fruits;
CREATE TABLE fruits (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);
CREATE INDEX idx_name_fruits ON fruits (name);
