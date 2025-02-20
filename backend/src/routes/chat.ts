import { Request, Response, Router } from "express";
import validateUser from "../middlewares/validateUser";
import { ChatService } from "../services/chat";

const chatRouter = Router();

chatRouter.post("/", validateUser, async (req: Request, res: Response) => {
    try {
        const service = new ChatService(req, req.userProfile);
        const search = await service.chat();

        res.send({
            data: search,
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).send({
            error: error.message,
        });
    }
})

export default chatRouter;
