CREATE TABLE IF NOT EXISTS movies_rating (
    id SERIAL PRIMARY KEY, 
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating  smallint NOT NULL check (rating between 1 and 5),
    comment VARCHAR(255) NOT NULL,
    CONSTRAINT movies_rating_users_foreign FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    CONSTRAINT movies_rating_movies_foreign FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);



INSERT INTO movies_rating (user_id, movie_id, rating, comment) values ('1', '1', 3,'nice'),
('2', '1', 2,'nice'),('3', '1', 5,'nice'),('4', '1', 5,'nice'),('5', '1', 5,'nice'),
('6', '1', 2,'nice'),('7', '1', 4,'nice'),('8', '1', 5,'nice'),('9', '1', 2,'nice'),
('10', '1', 5,'nice'),('1', '2', 2,'nice'),('2', '2', 1,'nice'),('3', '2', 5,'nice'),
('4', '2', 5,'nice'),('5', '2', 3,'nice'),('6', '2', 4,'nice'),('7', '2', 2,'nice'),
('8', '2', 1,'nice'),('9', '2', 1,'nice'),('10', '2', 1,'nice'),
('1', '3', 3,'nice'),('2', '3', 1,'nice'),('3', '3', 2,'nice'),('4', '3', 4,'nice'),
('5', '3', 3,'nice'),('6', '3', 1,'nice'),('7', '3', 3,'nice'),('8', '3', 1,'nice'),
('9', '3', 2,'nice'),('10', '3', 1,'nice');



