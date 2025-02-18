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

export const projectsTable = sqliteTable("projects", {
    id: text("id")
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    name: text("name").notNull(),
    desc: text("desc"),
    bannerURL: text("banner_url"),
    created_at: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
});

export const knowledges = sqliteTable("knowledges", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    type: text("type", { length: 50 })
        .$type<"text" | "document">()
        .notNull(),
    name: text("name"),
    desc: text("desc"),
    embedding: blob("embedding", { mode: "buffer" }).notNull(),
    projectId: text("project_id")
        .notNull()
        .references(() => projectsTable.id, { onDelete: "cascade" }),
    created_at: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
});
