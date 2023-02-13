import RatingStore from "../../models/rating"

const store = RatingStore()

describe("RATING MODEL SPEC", () => {
    it("should get ratings of a movie that has the id of 2", async () => {
        const ratings = await store.show(2)
        ratings.forEach((rating) => expect(rating.movie_id).toEqual(2))
    })

    it("Should create a rating successfully", async () => {
        const rating = await store.create({
            movie_id: 4,
            user_id: 6,
            rating: 4,
            comment: "Great",
        })

        expect(rating.movie_id).toEqual(4)
    })
})
