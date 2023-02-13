import { MovieStore } from "../../models/movies"
import { Movie } from "../../types"

const store = new MovieStore()

describe("Movie models test", (): void => {
    let movie: Movie

    // const fd = new FormData()

    // fs.readFile(`${testImagePath}/spider_man.jpg`, function (err, data) {
    //     fd.append("file", data, "spider_man.jpg")
    // })

    /// Create New Movie ///////////

    it("create movie models", async (): Promise<void> => {
        movie = await store.create({
            name: "movie-1",
            release_date: "9-10-2022",
            poster_image: `${Date.now()}.jpg`,
        })
        expect(movie.id).toBeTruthy()
    })

    /// Read All Movies ///////////
    it("Read All movies models", async (): Promise<void> => {
        expect(await store.index(1, 10)).toBeGreaterThan(0)
    })

    /// Show Movie ///////////

    it("Show movie by id models", async (): Promise<void> => {
        expect(await store.show(movie.id as string)).toEqual(movie)
    })

    /// Update Movie ///////////

    it("Update only movie name  models", async (): Promise<void> => {
        const newMovie = await store.update(
            {
                name: "movie-2",
            } as Movie,
            movie.id as string
        )
        expect(newMovie.name).toEqual("movie-2")
    })

    /// Delete Movie ///////////

    it("Delete movie by id models", async (): Promise<void> => {
        const movieId = (await store.delete(movie.id as string)).id
        expect(movieId).toEqual(movie.id as string)
    })
})
