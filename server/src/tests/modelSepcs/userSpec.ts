import userStore from "../../models/users"
import { User } from "../../types"

const store = userStore()

describe("USER SPEC", () => {
    let user: User
    beforeAll(async () => {
        user = await store.create({
            email: "test@gmail.com",
            password: "testsS1",
        })
    })

    it("should return all users", async () => {
        const users = await store.index()
        console.log(users)
        expect(users).toEqual([user])
    })
})
