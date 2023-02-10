CREATE TABLE IF NOT EXISTS movies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    poster_image VARCHAR(100) UNIQUE NOT NULL,
    release_date VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TRIGGER set_timestamp BEFORE UPDATE ON movies FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();


INSERT INTO movies (name, poster_image, release_date) values ('Black Adam', '1676058647594.jpg', '2-2-2023'),
('Batman', '1676058723014.jpg','9-2-2022'),
('Menu', '1676058733576.jpg', '1-5-2022'),
('Top Gun', '1676058744067.jpg', '3-6-2022')