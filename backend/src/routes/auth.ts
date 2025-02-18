import { Router } from "express";
import passport from "../lib/auth";

const authRouter = Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

export default authRouter;
