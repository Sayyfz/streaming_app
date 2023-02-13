import request from "supertest"
import app from "../../server"

const requester = request(app)

type RegistredUser = {
    id: string
    email: string
    created_at: string
    updated_at: string
}

describe("USER HANDLER SPEC", () => {
    let testUser: RegistredUser
    let token: string
    beforeAll(async () => {
        const registerRes = await requester.post("/api/users").send({
            email: "testinga123123KSAK92@yahoo.com",
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
        expect(res.body[+testUser.id - 1].email).toEqual(testUser.email)
        expect(res.body[+testUser.id - 1].id).toEqual(testUser.id)
    })

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

    it("Should delete the user created earlier", async () => {
        const res = await requester
            .delete("/api/users/")
            .set("Authorization", token)

        expect(res.body).toBeTruthy
        expect(res.body.email).toEqual(testUser.email)
        expect(res.body.id).toEqual(testUser.id)
    })
})
