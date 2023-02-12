import UserStore from "../../models/users"
import { User } from "../../types"

const store = new UserStore()

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
        const userProps = Object.keys(users[0])
        expect(userProps).toEqual(Object.keys(user))
    })

    it("should show the user created earlier", async () => {
        const u = await store.show(user.id as string)
        expect(u).toEqual(user)
    })

    it("should update the user created earlier", async () => {
        const newUser = {
            email: "updated@gmail.com",
            password: "testjjS2",
        }
        const updatedUser = await store.update(newUser, user.id as string)
        expect(updatedUser.id).toEqual(user.id)
        user = updatedUser
    })

    xit("should delete the user created earlier", async () => {
        const deletedUser = await store.delete(user.id as string)
        expect(deletedUser).toEqual(user)
    })
})
