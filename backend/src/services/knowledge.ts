import { Request } from "express";
import { db } from "../db";
import { knowledgeTable, vaultsTable } from "../db/schema";
import UserProfile from "../types/user";
import { and, eq } from "drizzle-orm";
import { embeddings } from "../server";
import { QdrantService } from "./qdrant";

export class KnowledgeService {
    currentUser: UserProfile;
    vaultId: string;
    content: string;
    type: string;
    file: File | undefined;

    constructor(req: Request, user: UserProfile) {
        this.currentUser = user;
        this.vaultId = req.body.vaultId;
        this.content = req.body.content;
        this.type = req.body.type;
        this.file = req.body.file;
    }

    async create() {
        if (!this.vaultId) throw Error("vaultId is required");
        if (!this.type) throw Error("type is required");
        if (this.type !== "text" && this.type !== "document") throw Error("type can only be text or file");

        console.log("[EMBEDDING...]");
        const embedResult = await embeddings.embedQuery(this.content);
        console.log("[EMBEDDING SUCCESS]");

        console.log("[INSERTING...]");
        const [createdKnowledge] = await db.insert(knowledgeTable).values({
            userId: this.currentUser.id,
            vaultId: this.vaultId,
            contentType: this.type,
            content: this.content,
        }).returning();
        console.log("[INSERTING SUCCESS]");

        console.log("[EMBED TO QDRANT...]");
        const qdrantService = new QdrantService();
        await qdrantService.upsert({
            id: createdKnowledge.id,
            vector: embedResult,
            payload: { userId: this.currentUser.id, vaultId: this.vaultId }
        });
        console.log("[EMBED TO QDRANT SUCCESS]");

        return createdKnowledge;
    }

    async findAll() {
        const knowledges = await db.select()
            .from(knowledgeTable)
            .where(
                and(
                    eq(knowledgeTable.userId, this.currentUser.id),
                    eq(knowledgeTable.vaultId, this.vaultId),
                )
            )
        return knowledges;
    }
}
