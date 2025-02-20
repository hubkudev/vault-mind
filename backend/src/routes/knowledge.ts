import { Request, Response, Router } from "express";
import validateUser from "../middlewares/validateUser";
import { KnowledgeService } from "../services/knowledge";

const knowledgeRouter = Router();

knowledgeRouter.post("/create", validateUser, async (req: Request, res: Response) => {
    try {
        const service = new KnowledgeService(req, req.userProfile);
        const createdKnowledge = await service.create();
        res.send({
            data: createdKnowledge,
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).send({
            error: error.message,
        });
    }
})

knowledgeRouter.post("/all", validateUser, async (req: Request, res: Response) => {
    try {
        const service = new KnowledgeService(req, req.userProfile);
        const knowledges = await service.findAll();

        res.send({
            data: knowledges,
        });
    } catch (error: any) {
        res.status(400).send({
            error: error.message,
        });
    }
})

export default knowledgeRouter;
