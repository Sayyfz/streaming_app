CREATE TABLE IF NOT EXISTS movies_rating (
    id SERIAL PRIMARY KEY, 
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating  smallint NOT NULL check (rating between 1 and 5),
    comment VARCHAR(255) NOT NULL,
    CONSTRAINT movies_rating_users_foreign FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    CONSTRAINT movies_rating_movies_foreign FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);