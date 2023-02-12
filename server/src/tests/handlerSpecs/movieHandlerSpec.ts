import supertest from "supertest"
import app from "../../server"
import { Movie } from "../../types"

const requester = supertest(app)

fdescribe("MOVIE HANDLER SPEC", () => {
    let testMovie: Movie
    const testImagePath = "testImages/1.jpg"
    beforeAll(async () => {
        const movieInfo = {
            name: "Test Movie",
            release_date: "29-03-2022",
        }
        try {
            const res = await requester
                .post("/api/movies/")
                .field(movieInfo)
                .attach("image", testImagePath)
                .expect(201)
            testMovie = res.body
        } catch (err) {
            console.log(err)
        }
    })

    it("should return page 1 that contains 2 movies", async () => {
        const res = await requester
            .get("/api/movies?page=1&limit=2")
            .expect(200)
        expect(res.body.movies).toBeTruthy()
        expect(res.body.movies.length).toEqual(2)
    })

    it("should get the movie created earlier", async () => {
        const res = await requester
            .get(`/api/movies/${testMovie.id}`)
            .expect(200)

        expect(res.body.id).toEqual(testMovie.id)
        expect(res.body.name).toEqual(testMovie.name)
    })

    it("should update the movie created earlier", async () => {
        const newMovieInfo = {
            name: "Updated Name",
            release_date: "01-01-2019",
        }
        const res = await requester
            .patch(`/api/movies/${testMovie.id}`)
            .field(newMovieInfo)
            .attach("image", testImagePath)

        console.log(res.body)
        expect(res.status).toEqual(200)
        expect(res.body.id).toBeTruthy()
        expect(res.body.name).toEqual(newMovieInfo.name)

        testMovie = res.body
    })

    it("should delete the movie created earlier", async () => {
        const res = await requester
            .delete(`/api/movies/${testMovie.id}`)
            .expect(200)

        expect(res.body.id).toEqual(testMovie.id)
        expect(res.body.name).toEqual(testMovie.name)
    })
})
