"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const requester = (0, supertest_1.default)(server_1.default);
describe("MOVIE HANDLER SPEC", () => {
    let testMovie;
    const testImagePath = "testImages/1.jpg";
    let testUser;
    let token;
    beforeAll(async () => {
        const registerRes = await requester.post("/api/users").send({
            email: "testinga1kjasn011ajsd23123KSAK92@yahoo.com",
            password: "tesSt21",
        });
        testUser = registerRes.body;
        const loginRes = await requester.post("/api/users/auth").send({
            email: testUser.email,
            password: "tesSt21",
        });
        token = `Bearer ${loginRes.body}`;
        const movieInfo = {
            name: "Test Movie",
            release_date: "29-03-2022",
        };
        try {
            const res = await requester
                .post("/api/movies/")
                .set("Authorization", token)
                .field(movieInfo)
                .attach("image", testImagePath)
                .expect(201);
            testMovie = res.body;
        }
        catch (err) {
            console.log(err);
        }
    });
    it("should return page 1 that contains 2 movies", async () => {
        const res = await requester
            .get("/api/movies?page=1&limit=2")
            .expect(200);
        expect(res.body.movies).toBeTruthy();
        expect(res.body.movies.length).toEqual(2);
    });
    it("should get the movie created earlier", async () => {
        const res = await requester
            .get(`/api/movies/${testMovie.id}`)
            .expect(200);
        expect(res.body.id).toEqual(testMovie.id);
        expect(res.body.name).toEqual(testMovie.name);
    });
    it("should return unauthorized error with status 401 (can't update movie)", async () => {
        await requester
            .patch(`/api/movies/${testMovie.id}`)
            .set("Authorization", "sasasa")
            .expect(401);
    });
    it("should update the movie created earlier", async () => {
        const newMovieInfo = {
            name: "Updated Name",
            release_date: "01-01-2019",
        };
        const res = await requester
            .patch(`/api/movies/${testMovie.id}`)
            .set("Authorization", token)
            .field(newMovieInfo)
            .attach("image", testImagePath);
        expect(res.status).toEqual(200);
        expect(res.body.id).toBeTruthy();
        expect(res.body.name).toEqual(newMovieInfo.name);
        testMovie = res.body;
    });
    it("should return unauthorized error with status 401 (can't delete movie)", async () => {
        await requester
            .delete(`/api/movies/${testMovie.id}`)
            .set("Authorization", "sasasa")
            .expect(401);
    });
    it("should delete the movie created earlier", async () => {
        const res = await requester
            .delete(`/api/movies/${testMovie.id}`)
            .set("Authorization", token)
            .expect(200);
        expect(res.body.id).toEqual(testMovie.id);
        expect(res.body.name).toEqual(testMovie.name);
    });
});
