CREATE TABLE IF NOT EXISTS movies_rating (
    id SERIAL PRIMARY KEY, 
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating  smallint NOT NULL check (rating between 1 and 5),
    comment VARCHAR(255) NOT NULL,
    is_liked BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT movies_rating_users_foreign FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    CONSTRAINT movies_rating_movies_foreign FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    UNIQUE(user_id, movie_id)
);



INSERT INTO movies_rating (user_id, movie_id, rating, comment, is_liked) VALUES ('1', '1', 3,'nice', false),
('2', '1', 2,'nice', false),('3', '1', 5,'nice', true),('4', '1', 5,'nice', true),('5', '1', 5,'nice', true),
('6', '1', 2,'nice', true),('7', '1', 4,'nice', true),('8', '1', 5,'nice', true),('9', '1', 2,'nice', true),
('10', '1', 5,'nice', true),('1', '2', 2,'nice', true),('2', '2', 1,'nice', true),('3', '2', 5,'nice', true),
('4', '2', 5,'nice', false),('5', '2', 3,'nice', true),('6', '2', 4,'nice', false),('7', '2', 2,'nice', true),
('8', '2', 1,'nice', true),('9', '2', 1,'nice', true),('10', '2', 1,'nice', true),
('1', '3', 3,'nice', false),('2', '3', 1,'nice', true),('3', '3', 2,'nice', true),('4', '3', 4,'nice', true),
('5', '3', 3,'nice', true),('6', '3', 1,'nice', true),('7', '3', 3,'nice', true),('8', '3', 1,'nice', true),
('9', '3', 2,'nice', false),('10', '3', 1,'nice', false);




