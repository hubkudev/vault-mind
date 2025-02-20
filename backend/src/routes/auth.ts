import { Router } from "express";
import passport from "../lib/auth";

const authRouter = Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: `${process.env.CLIENT_URL}/vault`
}));

authRouter.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect(`${process.env.CLIENT_URL}/vault`);
    });
});

export default authRouter;
