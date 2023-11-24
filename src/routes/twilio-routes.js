import express from "express";
import {
  getOneTimePassword,
  verifyOneTimePassword,
} from "../controllers/twilio-controllers/index.js";

const twilioRouter = express.Router();

twilioRouter.post("/getOneTimePassword", getOneTimePassword);
twilioRouter.post("/verifyOneTimePassword", verifyOneTimePassword);

export default twilioRouter;
