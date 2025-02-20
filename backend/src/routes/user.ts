import { Router, Request, Response } from "express";
import UserProfile from "../types/user";

const userRouter = Router();

userRouter.get("/profile", (req: Request, res: Response) => {
    const user = req.user as UserProfile;
    if (!user) res.sendStatus(401);
    res.send(user);
});

export default userRouter;
