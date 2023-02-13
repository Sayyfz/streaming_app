CREATE TABLE IF NOT EXISTS user_list(
    id SERIAL PRIMARY KEY, 
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    UNIQUE(user_id, movie_id),
    CONSTRAINT user_list_user_id FOREIGN KEY (user_id) REFERENCES  users(id) ON DELETE CASCADE,
    CONSTRAINT suer_list_movie_id FOREIGN KEY (movie_id) REFERENCES  movies(id) ON DELETE CASCADE
);