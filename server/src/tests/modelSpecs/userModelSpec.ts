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
        const userProps = Object.keys(users[0])
        expect(userProps).toEqual(Object.keys(user))
    })

    it("should show the user created earlier", async () => {
        const u = await store.show(user.id as string)
        expect(u).toEqual(user)
    })

    it("should return a jwt token successfully", async () => {
        const credentials = {
            email: user.email,
            password: "testsS1",
        }

        const newUser = await store.login(credentials)
        expect(newUser?.email).toEqual(user.email)
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

    it("should add a movie to user's list of movies", async () => {
        const userMovie: FavouriteMovie = {
            user_id: "1",
            movie_id: "4",
        }
        const createdUserMovie = await store.add_to_list(userMovie)

        expect(createdUserMovie.user_id).toEqual(userMovie.user_id)
        expect(createdUserMovie.movie_id).toEqual(userMovie.movie_id)
    })

    it("should delete the user created earlier", async () => {
        const deletedUser = await store.delete(user.id as string)
        expect(deletedUser).toEqual(user)
    })
})
