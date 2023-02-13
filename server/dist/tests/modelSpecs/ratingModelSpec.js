"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rating_1 = __importDefault(require("../../models/rating"));
describe("RATING MODEL SPEC", () => {
    it("Should create a rating successfully", async () => {
        const rating = await rating_1.default.create({
            movie_id: 4,
            user_id: 6,
            rating: 4,
            comment: "Great",
            is_liked: false,
        });
        expect(rating.movie_id).toEqual(4);
    });
});
