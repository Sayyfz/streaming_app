import store from "../../models/rating"

describe("RATING MODEL SPEC", () => {
    it("Should create a rating successfully", async () => {
        const rating = await store.create({
            movie_id: 4,
            user_id: 6,
            rating: 4,
            comment: "Great",
            is_liked: false,
        })

        expect(rating.movie_id).toEqual(4)
    })
})
