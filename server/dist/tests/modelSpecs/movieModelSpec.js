"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = __importDefault(require("../../models/movie"));
const path_1 = require("../../path");
const sharp_1 = __importDefault(require("../../utilities/sharp"));
describe("MOVIE MODEL SPEC", () => {
    let testMovie;
    const testImagePath = "testImages/1.jpg";
    beforeAll(async () => {
        const poster_image = await (0, sharp_1.default)(testImagePath, 300, 500, path_1.postersPath);
        testMovie = await movie_1.default.create({
            name: "Test Movie2",
            release_date: "12-02-2013",
            poster_image,
        });
    });
    it("should return all movies", async () => {
        const movies = await movie_1.default.index(2, 4);
        expect(movies.length).toBeGreaterThan(0);
        expect(movies[1].id).toBeTruthy();
        expect(movies[2].name).toBeTruthy();
        expect(movies[0].release_date).toBeTruthy();
    });
    it("should return the movie created earlier", async () => {
        const movie = await movie_1.default.show(testMovie.id);
        expect(movie.id).toEqual(testMovie.id);
        expect(movie.name).toEqual(testMovie.name);
        expect(movie.release_date).toEqual(testMovie.release_date);
    });
    it("should update the movie created earlier", async () => {
        const poster_image = await (0, sharp_1.default)(testImagePath, 300, 500, path_1.postersPath);
        const newMovie = {
            name: "Updated Test2",
            release_date: "22-01-2013",
            poster_image,
        };
        const updatedMovie = await movie_1.default.update(newMovie, testMovie.id);
        expect(updatedMovie.id).toEqual(testMovie.id);
        expect(updatedMovie.name).toEqual("Updated Test2");
        expect(updatedMovie.release_date).toBeTruthy();
        testMovie = updatedMovie;
    });
    it("should delete the movie created earlier", async () => {
        const movie = await movie_1.default.delete(testMovie.id);
        expect(movie.id).toEqual(testMovie.id);
        expect(movie.name).toEqual(testMovie.name);
        expect(movie.release_date).toEqual(testMovie.release_date);
    });
});
