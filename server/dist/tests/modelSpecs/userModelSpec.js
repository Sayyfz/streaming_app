"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
describe("USER MODEL SPEC", () => {
    let user;
    beforeAll(async () => {
        try {
            user = await user_1.default.create({
                email: "ioioio@gmail.com",
                password: "testsS1",
            });
        }
        catch (err) {
            console.log(err.message);
        }
    });
    it("should return all users", async () => {
        const users = await user_1.default.index();
        const userProps = Object.keys(users[0]);
        expect(userProps).toEqual(Object.keys(user));
    });
    it("should show the user created earlier", async () => {
        const u = await user_1.default.show(user.id);
        expect(u.id).toEqual(user.id);
    });
    it("should return user credentials successfully", async () => {
        const credentials = {
            email: user.email,
            password: "testsS1",
        };
        const newUser = await user_1.default.login(credentials);
        expect(newUser?.email).toEqual(user.email);
    });
    it("should update the user created earlier", async () => {
        const newUser = {
            email: "updated81uiioioas@gmail.com",
            password: "testjjS2",
        };
        const updatedUser = await user_1.default.update(newUser, user.id);
        expect(updatedUser.id).toEqual(user.id);
        user = updatedUser;
    });
    it("should add a movie to user's list of movies", async () => {
        const userMovie = {
            user_id: `${user.id}`,
            movie_id: "4",
        };
        const createdUserMovie = await user_1.default.add_to_list(userMovie);
        expect(createdUserMovie.user_id.toString()).toEqual(userMovie.user_id);
        expect(createdUserMovie.movie_id.toString()).toEqual(userMovie.movie_id);
    });
});
