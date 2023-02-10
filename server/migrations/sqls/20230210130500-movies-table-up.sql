CREATE TABLE IF NOT EXISTS movies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    poster_image VARCHAR(100) UNIQUE NOT NULL,
    release_date VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TRIGGER set_timestamp BEFORE UPDATE ON movies FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();


