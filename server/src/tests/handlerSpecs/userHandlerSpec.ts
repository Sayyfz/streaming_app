import supertest from "supertest"
import request from "supertest"
import app from "../../server"
import { RegistredUser } from "../../types"

const requester = request(app)

describe("USER HANDLER SPEC", () => {
    let testUser: RegistredUser
    let token: string
    beforeAll(async () => {
        const registerRes = await requester.post("/api/users").send({
            email: "lalaAK92@yahoo.com",
            password: "tesSt21",
        })
        testUser = registerRes.body
        const loginRes = await requester.post("/api/users/auth").send({
            email: testUser.email,
            password: "tesSt21",
        })
        token = `Bearer ${loginRes.body}`
    })

    it("Should return a list of users", async () => {
        const res = await requester
            .get("/api/users")
            .set("Authorization", token)

        expect(res.body.length).toBeTruthy
    })

    //CREATE USER

    it("Should return the user created earlier", (done: DoneFn) => {
        requester
            .get("/api/users/profile")
            .set("Authorization", token)
            .end((err, res: request.Response) => {
                if (err) console.log(err)
                expect(res.body).toBeTruthy
                expect(res.body.email).toEqual(testUser.email)
                expect(res.body.id).toEqual(testUser.id)
                done()
            })
    })

    describe("Validation and Auth specs", () => {
        it("Should return unauthorized error with status 401", (done: DoneFn) => {
            requester
                .get("/api/users/profile")
                .set("Authorization", "jasjkdajksd")
                .expect(401)
                .end((err) => {
                    if (err) console.log(err)
                    done()
                })
        })

        it("Should return unprocessable unit error with status 422", (done: DoneFn) => {
            requester
                .post("/api/users/")
                .send({
                    email: "lalaaaagmailcom",
                    password: "testsSsa1",
                })
                .expect(422)
                .end((err) => {
                    if (err) console.log(err)
                    done()
                })
        })

        it("Should return error indicating that password is too weak with status 422", (done: DoneFn) => {
            requester
                .post("/api/users/")
                .send({
                    email: "lalaaa@gmail.com",
                    password: "123456",
                })
                .end((err, res: supertest.Response) => {
                    expect(res.status).toEqual(422)
                    if (err) console.log(err)
                    done()
                })
        })
    })

    //UPDATE USER

    it("Should update the user created earlier", async () => {
        const res = await requester
            .patch("/api/users/")
            .set("Authorization", token)
            .send({
                email: "updated123321631@gmail.com",
                password: "testSdsawW21",
            })
        expect(res.body).toBeTruthy
        expect(res.body.email).toEqual("updated123321631@gmail.com")
        expect(res.body.id).toEqual(testUser.id)
        expect(Object.keys(res.body).includes("updated_at"))
        expect(Object.keys(res.body).includes("created_at"))

        testUser = res.body
    })

    //DELETE USER

    it("Should delete the user created earlier", async () => {
        const res = await requester
            .delete("/api/users/")
            .set("Authorization", token)

        expect(res.body).toBeTruthy
        expect(res.body.email).toEqual(testUser.email)
        expect(res.body.id).toEqual(testUser.id)
    })

    it
})
