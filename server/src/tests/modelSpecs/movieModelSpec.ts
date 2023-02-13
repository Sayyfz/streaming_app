import store from "../../models/movie"
import { postersPath } from "../../path"
import { Movie } from "../../types"
import resizeImage from "../../utilities/sharp"

describe("MOVIE MODEL SPEC", () => {
    let testMovie: Movie
    const testImagePath = "testImages/1.jpg"
    beforeAll(async () => {
        const poster_image = await resizeImage(
            testImagePath,
            300,
            500,
            postersPath
        )
        testMovie = await store.create({
            name: "Test Movie2",
            release_date: "12-02-2013",
            poster_image,
        })
    })

    it("should return all movies", async () => {
        const movies = await store.index(2, 4)
        expect(movies.length).toBeGreaterThan(0)
        expect(movies[1].id).toBeTruthy()
        expect(movies[2].name).toBeTruthy()
        expect(movies[0].release_date).toBeTruthy()
    })

    it("should return the movie created earlier", async () => {
        const movie = await store.show(testMovie.id as string)

        expect(movie.id).toEqual(testMovie.id)
        expect(movie.name).toEqual(testMovie.name)
        expect(movie.release_date).toEqual(testMovie.release_date)
    })

    it("should update the movie created earlier", async () => {
        const poster_image = await resizeImage(
            testImagePath,
            300,
            500,
            postersPath
        )

        const newMovie = {
            name: "Updated Test2",
            release_date: "22-01-2013",
            poster_image,
        }

        const updatedMovie = await store.update(
            newMovie,
            testMovie.id as string
        )

        expect(updatedMovie.id).toEqual(testMovie.id)
        expect(updatedMovie.name).toEqual("Updated Test2")
        expect(updatedMovie.release_date).toBeTruthy()

        testMovie = updatedMovie
    })

    it("should delete the movie created earlier", async () => {
        const movie = await store.delete(testMovie.id as string)

        expect(movie.id).toEqual(testMovie.id)
        expect(movie.name).toEqual(testMovie.name)
        expect(movie.release_date).toEqual(testMovie.release_date)
    })
})
