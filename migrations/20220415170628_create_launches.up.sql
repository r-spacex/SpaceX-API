CREATE TABLE IF NOT EXISTS launches (
    rowid SERIAL NOT NULL,
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    flight_number SMALLINT NOT NULL,
    name TEXT NOT NULL,
    rocket UUID
);