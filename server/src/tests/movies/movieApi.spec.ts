import supertest from "supertest"
import app from "../../server"
import { User } from "../../types"
const HttpReqest = supertest(app)

describe("USER HANDLER SPEC", () => {
    let user: User
    let token: string
    beforeAll(async () => {
        const registerRes = await HttpReqest.post("/api/users").send({
            email: "testinga123123KSAK92@yahoo.com",
            password: "tesSt21",
        })
        user = registerRes.body

        const loginRes = await HttpReqest.post("/api/users/auth").send({
            email: user.email,
            password: "tesSt21",
        })
        token = `Bearer ${loginRes.body.token}`

        console.log(token)
    })
    ///////////////////////////////////////////////////////////
    // login api //
    ////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    // read all user api //
    ////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    // show profile api //
    ////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    //  update profile api //
    ////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    // delete user api //
    ////////////////////////////////////////////////////////////
})
