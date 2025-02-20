import { Request } from "express";
import { db } from "../db";
import { vaultsTable } from "../db/schema";
import UserProfile from "../types/user";
import { and, eq } from "drizzle-orm";

export class VaultService {
    currentUser: UserProfile;
    name: string;
    desc: string;

    constructor(req: Request, user: UserProfile) {
        this.currentUser = user;
        this.name = req.body.name;
        this.desc = req.body.desc;
    }

    async checkExist(): Promise<boolean> {
        const isExist = await db.select()
            .from(vaultsTable)
            .where(
                and(
                    eq(vaultsTable.name, this.name),
                    eq(vaultsTable.userId, this.currentUser.id),
                )
            )
            .limit(1);

        return isExist.length ? true : false;
    }

    async create() {
        if (!this.name) throw Error("Name is required");

        // check if name is already present for current user
        if (await this.checkExist()) throw Error("Name already present in your vault");

        const [createdVault] = await db.insert(vaultsTable).values({
            name: this.name,
            desc: this.desc,
            userId: this.currentUser.id,
        }).returning();

        return createdVault;
    }

    async findAll() {
        const vaults = await db.select()
            .from(vaultsTable)
            .where(eq(vaultsTable.userId, this.currentUser.id))
        return vaults;
    }

    async findById(vaultId: string) {
        if (!vaultId) throw Error("Vault ID is required");

        const vaults = await db.select()
            .from(vaultsTable)
            .where(
                and(
                    eq(vaultsTable.id, vaultId),
                    eq(vaultsTable.userId, this.currentUser.id),
                )
            )
            .limit(1);

        return vaults;
    }
}
