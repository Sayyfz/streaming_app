"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const secret = process.env.TOKEN_SECRET;
const store = new users_1.UserStore();
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
