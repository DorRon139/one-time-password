import express from "express";
import userRouter from "./user-routes.js";
import twilioRouter from "./twilio-routes.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/twilio",
    route: twilioRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
