#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DROP TABLE IF EXISTS fruits;
    CREATE TABLE fruits (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT
    );
    CREATE INDEX idx_name_fruits ON fruits (name);
EOSQL