import { Request, Response, Router } from "express";
import { VaultService } from "../services/vault";
import validateUser from "../middlewares/validateUser";

const vaultRouter = Router();

vaultRouter.post("/create", validateUser, async (req: Request, res: Response) => {
    try {
        const service = new VaultService(req, req.userProfile);
        const createdVault = await service.create();
        res.send({
            data: createdVault,
        });
    } catch (error: any) {
        res.status(400).send({
            error: error.message,
        });
    }
})

vaultRouter.get("/all", validateUser, async (req: Request, res: Response) => {
    try {
        const service = new VaultService(req, req.userProfile);
        const vaults = await service.findAll();

        res.send({
            data: vaults,
        });
    } catch (error: any) {
        res.status(400).send({
            error: error.message,
        });
    }
})

vaultRouter.get("/:id", validateUser, async (req: Request, res: Response) => {
    try {
        const service = new VaultService(req, req.userProfile);
        const vault = await service.findById(req.params.id);

        res.send({
            data: vault,
        });
    } catch (error: any) {
        res.status(400).send({
            error: error.message,
        });
    }
})

export default vaultRouter;
