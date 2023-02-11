type Movie = {
    [x: string]: unknown
    id?: string
    name: string
    release_date: string
    poster_image: string
    created_at?: Date
    updated_at?: Date
}

export default Movie
