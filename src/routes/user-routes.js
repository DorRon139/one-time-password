import express from "express";

import { createUser } from "../controllers/user-controllers/index.js";

const userRouter = express.Router();

userRouter.post("/createUser", createUser);

export default userRouter;
