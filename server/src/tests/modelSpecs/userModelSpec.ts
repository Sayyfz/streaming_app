import store from "../../models/user"
import { FavouriteMovie, User } from "../../types"

describe("USER MODEL SPEC", () => {
    let user: User
    beforeAll(async () => {
        try {
            user = await store.create({
                email: "ioioio@gmail.com",
                password: "testsS1",
            })
            console.log(user)
        } catch (err) {
            console.log((err as Error).message)
        }
    })

    it("should return all users", async () => {
        const users = await store.index()
        const userProps = Object.keys(users[0])
        expect(userProps).toEqual(Object.keys(user))
        console.log(users)
    })

    it("should show the user created earlier", async () => {
        try {
            const u = await store.show(user.id as string)
            expect(u.id).toEqual(user.id)
        } catch (err) {
            console.log(err)
        }
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
            email: "updated81uiioioas@gmail.com",
            password: "testjjS2",
        }
        const updatedUser = await store.update(newUser, user.id as string)
        expect(updatedUser.id).toEqual(user.id)
        user = updatedUser
    })

    it("should add a movie to user's list of movies", async () => {
        const userMovie: FavouriteMovie = {
            user_id: `${user.id}`,
            movie_id: "4",
        }
        const createdUserMovie = await store.add_to_list(userMovie)

        expect(createdUserMovie.user_id.toString()).toEqual(userMovie.user_id)
        expect(createdUserMovie.movie_id.toString()).toEqual(userMovie.movie_id)
    })

    it("should delete the user created earlier", async () => {
        const deletedUser = await store.delete(user.id as string)
        expect(deletedUser).toEqual(user)
    })
})
