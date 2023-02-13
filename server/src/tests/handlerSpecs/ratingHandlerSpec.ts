import supertest from "supertest"
import app from "../../server"

const requester = supertest(app)

fdescribe("RATING HANDLER SPEC", () => {
    it("Should return rating of the movie with id 2", async () => {
        const res = await requester
            .get("/api/rating/movies/2")
            .expect(200)
            .expect("Content-Type", /json/)

        expect(res.body).toBeTruthy()
        expect(res.body.length).toBeTruthy()
        expect(res.body[0].movie_id).toEqual(2)
    })
    it("should create a rating successfully", async () => {
        const res = await requester
            .post("/api/rating/")
            .send({
                movie_id: 4,
                user_id: 11,
                rating: 4,
                comment: "Great",
            })
            .expect(201)
            .expect("Content-Type", /json/)

        expect(res.body).toBeTruthy()
        expect(res.body.movie_id).toEqual(4)
        expect(res.body.user_id).toEqual(11)
    })
})
