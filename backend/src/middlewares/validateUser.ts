import { Request, Response, NextFunction } from "express";
import UserProfile from "../types/user";

declare global {
    namespace Express {
        interface Request {
            userProfile: UserProfile;
        }
    }
}

export default function validateUser(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    req.userProfile = req.user as UserProfile;
    next();
};
