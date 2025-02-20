import { qdrant } from "../server";

export class QdrantService {
    collectionName: string = "vault_knowledges";

    constructor() { }

    async upsert({
        id, vector, payload
    }: {
        id: number,
        vector: number[] | number[][]
        payload: { [key: string]: any }
    }) {
        await this.ensureCollectionExists();
        await qdrant.upsert(this.collectionName, {
            wait: true,
            points: [
                {
                    id: id,
                    vector: vector,
                    payload: payload,
                }
            ]
        });
    }

    async ensureCollectionExists() {
        const collections = await qdrant.getCollections();
        if (!collections.collections.some(col => col.name === this.collectionName)) {
            await qdrant.createCollection(this.collectionName, {
                vectors: { size: 1536, distance: "Cosine" },
            });
        }
    }

    async retrieve(vaultId: string, userId: string, vector: number[], topK: number = 3) {
        return await qdrant.search(this.collectionName, {
            vector: vector,
            limit: topK,
            score_threshold: 0.3,
            filter: {
                must: [
                    { key: "userId", match: { value: userId } },
                    { key: "vaultId", match: { value: vaultId } },
                ]
            }
        });
    }
}
