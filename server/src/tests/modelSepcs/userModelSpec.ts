import userStore from "../../models/users"
import { User } from "../../types"

const store = userStore()

describe("USER SPEC", () => {
    let user: User
    beforeAll(async () => {
        try {
            user = await store.create({
                email: "test@gmail.com",
                password: "testsS1",
            })
        } catch (err) {
            console.log((err as Error).message)
        }
    })

    it("should return all users", async () => {
        const users = await store.index()
        console.log(users)
        expect(users).toEqual([user])
    })

    it("should show the user created earlier", async () => {
        const u = await store.show(user.id as unknown as number)
        expect(u).toEqual(user)
    })

    it("should update the user created earlier", async () => {
        const newUser = {
            email: "updated@gmail.com",
            password: "testjjS2",
        }
        const updatedUser = await store.update(
            newUser,
            user.id as unknown as number
        )
        expect(updatedUser).toEqual({ id: user.id, ...newUser })
        user = updatedUser
    })

    it("should delete the user created earlier", async () => {
        const deletedUser = await store.delete(user.id as unknown as number)
        expect(deletedUser).toEqual(user)
    })
})
