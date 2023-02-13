"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const requester = (0, supertest_1.default)(server_1.default);
describe("RATING HANDLER SPEC", () => {
    let testUser;
    let token;
    beforeAll(async () => {
        const registerRes = await requester.post("/api/users").send({
            email: "lakaispq@yahoo.com",
            password: "tesSt21",
        });
        testUser = registerRes.body;
        const loginRes = await requester.post("/api/users/auth").send({
            email: testUser.email,
            password: "tesSt21",
        });
        token = `Bearer ${loginRes.body}`;
    });
    it("should return error indicating that the range must be between 1-5", async () => {
        await requester
            .post("/api/rating/")
            .send({
            movie_id: 4,
            rating: 6,
            comment: "Great",
            is_liked: false,
        })
            .set("Authorization", token)
            .expect(422)
            .expect("Content-Type", /json/);
    });
    it("should create a rating successfully", async () => {
        const res = await requester
            .post("/api/rating/")
            .send({
            movie_id: 4,
            rating: 1,
            comment: "Great",
            is_liked: false,
        })
            .set("Authorization", token)
            .expect(201)
            .expect("Content-Type", /json/);
        expect(res.body).toBeTruthy();
        expect(res.body.movie_id).toEqual(4);
        expect(res.body.user_id).toEqual(testUser.id);
    });
});
