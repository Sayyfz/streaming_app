import MovieStore from "../../models/movie"
import { fullPath, postersPath } from "../../path"
import { Movie } from "../../types"
import resizeImage from "../../utilities/sharp"

const store = new MovieStore()

describe("MOVIE MODEL SPEC", () => {
    let movie: Movie

    //// create movie model
    it("should create new movie ", async (): Promise<void> => {
        const poster_image = await resizeImage(
            `${fullPath}/spider_man.jpg`,
            300,
            500,
            postersPath
        )
        movie = await store.create({
            name: "spider man",
            release_date: "9-10-2022",
            poster_image,
        })
        expect(movie.id).toBeTruthy()
    })

    // Read All Movies model
    it("should return all movies", async (): Promise<void> => {
        expect((await store.index(1, 10)).length).toBeGreaterThan(0)
    })

    // select one movie
    it("should return selected movie by id", async (): Promise<void> => {
        expect((await store.show(movie.id as string)).id).toEqual(movie.id)
    })

    // update movie
    it("should update the movie name ", async (): Promise<void> => {
        const updatedMovie = await store.update(
            {
                name: "spider man no way home",
            } as Movie,
            movie.id as string
        )
        expect(updatedMovie.name).toEqual("spider man no way home")
    })

    it("should update the movie release_date  ", async (): Promise<void> => {
        const updatedMovie = await store.update(
            {
                release_date: "10-10-2022",
            } as Movie,
            movie.id as string
        )
        expect(updatedMovie.release_date).not.toEqual(movie.release_date)
    })

    it("should update the movie poster ", async (): Promise<void> => {
        const poster_image = await resizeImage(
            `${fullPath}/no_way_home.jpg`,
            300,
            500,
            postersPath
        )
        const updatedMovie = await store.update(
            {
                poster_image,
            } as Movie,
            movie.id as string
        )
        expect(updatedMovie.poster_image).not.toEqual(movie.poster_image)
    })

    /// delete movie
    it("should delete the movie created earlier", async (): Promise<void> => {
        expect((await store.delete(movie.id as string)).id).toEqual(
            movie.id as string
        )
    })
})
