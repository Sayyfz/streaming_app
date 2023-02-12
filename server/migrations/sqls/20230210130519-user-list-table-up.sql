CREATE TABLE IF NOT EXISTS user_list(
    id SERIAL PRIMARY KEY, 
    user_id bigint REFERENCES users(id),
    movie_id bigint REFERENCES movies(id),
    UNIQUE(user_id, movie_id) 
    -- A user cannot put the same movie in their list 2 times, that's why we include this constraint
);