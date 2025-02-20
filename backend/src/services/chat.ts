import { Request } from "express";
import UserProfile from "../types/user";
import { embeddings } from "../server";
import { QdrantService } from "./qdrant";
import { db } from "../db";
import { knowledgeTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export class ChatService {
    currentUser: UserProfile;
    vaultId: string;
    query: string;

    constructor(req: Request, user: UserProfile) {
        this.currentUser = user;
        this.vaultId = req.body.vaultId;
        this.query = req.body.query;
    }

    async chat() {
        if (!this.query || !this.vaultId) throw Error("Query and Vault ID are required");

        const rag = await this.search();

        const context = rag.join("\n");

        const prompt = `You are a helpful assistant. Use the following knowledge to answer the question:\n\n${context}\n\nQuestion: ${this.query}`;

        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_KEY,
            modelName: "gpt-4o-mini",
        });
        const message = [new HumanMessage(prompt)];
        const response = await model.invoke(message);

        return response.content;
    }

    async search() {
        console.log("[EMBEDDING...]");
        const queryEmbedding = await embeddings.embedQuery(this.query);
        console.log("[EMBEDDING SUCCESS]");

        console.log("[RETRIEVING RAG...]");
        const qdrantService = new QdrantService();
        const results = await qdrantService.retrieve(this.vaultId, this.currentUser.id.toString(), queryEmbedding);
        console.log("[RETRIEVING SUCCESS]");

        if (!results.length) return [];

        let knowledges = [];

        console.log("[RETRIEVING CONTENT...]");
        for (const item of results) {
            const knowledge = await db.select({
                content: knowledgeTable.content,
            })
                .from(knowledgeTable)
                .where(
                    and(
                        eq(knowledgeTable.id, parseInt(`${item.id}`)),
                        eq(knowledgeTable.userId, this.currentUser.id),
                        eq(knowledgeTable.vaultId, this.vaultId),
                    )
                )
                .limit(1);
            knowledges.push(knowledge[0].content);
        }
        console.log("[RETRIEVING CONTENT SUCCESS]");

        return knowledges;
    }
}
