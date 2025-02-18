import { Request, Response, Router } from "express";

const indexRouter = Router();

indexRouter.get("/health", (req: Request, res: Response) => {
    res.send("OK");
})

export default indexRouter;
