import { blob, integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { AUTH_PROVIDER } from "../constants";
import { sql } from "drizzle-orm";

export const usersTable = sqliteTable("users", {
    id: text("id")
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    username: text("username")
        .unique()
        .notNull(),
    email: text("email")
        .unique()
        .notNull(),
    provider: text("provider", { length: 100 })
        .notNull()
        .$default(() => AUTH_PROVIDER.GOOGLE),
    profilePicture: text("profile_picture"),
    created_at: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
}, (table) => ({
    userUsernameIdx: index("user_username_idx").on(table.username),
    userEmailIdx: index("user_email_idx").on(table.email)
}));

export const vaultsTable = sqliteTable("vaults", {
    id: text("id")
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    name: text("name").notNull(),
    desc: text("desc"),
    bannerURL: text("banner_url"),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
});

export const knowledgeTable = sqliteTable("knowledges", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    contentType: text("content_type", { length: 50 }).notNull(),
    content: text("content"),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    vaultId: text("vault_id")
        .notNull()
        .references(() => vaultsTable.id, { onDelete: "cascade" }),
    createdAt: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
});
