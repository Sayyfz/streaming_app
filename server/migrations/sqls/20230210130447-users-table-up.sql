CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO users (email, password) VALUES ('ahmed@yahoo.com', '123456'),
('bobos@yahoo.com', '123456'),
('7oda@yahoo.com', '123456'),
('momd@yahoo.com', '123456'),
('shosho@yahoo.com', '123456'),
('dodo@yahoo.com', '123456'),
('lolo@yahoo.com', '123456'),
('bobob@yahoo.com', '123456'),
('dodoy@yahoo.com', '123456'),
('lolo2000@yahoo.com', '123456'),
('nono@yahoo.com', '123456');