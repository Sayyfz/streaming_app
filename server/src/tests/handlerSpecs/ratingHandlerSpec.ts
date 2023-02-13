import supertest from "supertest"
import app from "../../server"
import { RegistredUser } from "../../types"

const requester = supertest(app)

describe("RATING HANDLER SPEC", () => {
    let testUser: RegistredUser
    let token: string

    beforeAll(async () => {
        const registerRes = await requester.post("/api/users").send({
            email: "lakaispq@yahoo.com",
            password: "tesSt21",
        })
        testUser = registerRes.body

        const loginRes = await requester.post("/api/users/auth").send({
            email: testUser.email,
            password: "tesSt21",
        })
        token = `Bearer ${loginRes.body}`
    })

    it("should create a rating successfully", async () => {
        const res = await requester
            .post("/api/rating/")
            .send({
                movie_id: 4,
                rating: 1,
                comment: "Great",
                is_liked: false,
            })
            .set("Authorization", token)
            .expect(201)
            .expect("Content-Type", /json/)
        expect(res.body).toBeTruthy()
        expect(res.body.movie_id).toEqual(4)
        expect(res.body.user_id).toEqual(testUser.id)
    })
})
