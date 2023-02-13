import UserStore from "../../models/user"
import { User } from "../../types"

const store = new UserStore()
describe("create user models", (): void => {
    let user: User

    /// create user
    it("should create new user", async (): Promise<void> => {
        user = await store.create({
            email: "user0@email.com",
            password: "123456asdf",
        })
        expect(user.id).toBeTruthy()
    })

    /// user  login

    // Read users
    it("should read all users ", async (): Promise<void> => {
        expect((await store.index()).length).toBeGreaterThan(0)
    })
    // user profile
    it("should return user profile ", async (): Promise<void> => {
        expect((await store.show(user.id as string)).id).toEqual(user.id)
    })

    // update user
    it("should update user name", async (): Promise<void> => {
        const u = await store.update(
            {
                email: "ahmed20000@yahoo.com",
            } as User,
            user.id as string
        )

        expect(u.email).toEqual("ahmed20000@yahoo.com")
    })

    it("should update user passwoard", async (): Promise<void> => {
        const u = await store.update(
            {
                password: "1234562000",
            } as User,
            user.id as string
        )

        expect(u.email).not.toEqual("1234562000")
    })

    it("should update user email and password", async (): Promise<void> => {
        const u = await store.update(
            {
                email: user.email,
                password: "1123213dasdasdsad",
            } as User,
            user.id as string
        )

        expect(u.id).toEqual(user.id)
    })

    // user delete

    it("delete user model", async (): Promise<void> => {
        expect((await store.delete(user.id as string)).id).toEqual(user.id)
    })
})
