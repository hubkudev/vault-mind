import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config"
import cors from "cors";
import express, { Express } from "express";
import indexRouter from "./routes/router";
import authRouter from "./routes/auth";
import session from "express-session";
import passport from "./lib/auth";
import FileStore from "session-file-store";
import userRouter from "./routes/user";
import vaultRouter from "./routes/vault";
import chatRouter from "./routes/chat";
import knowledgeRouter from "./routes/knowledge";
import { OpenAIEmbeddings } from "@langchain/openai";

export const qdrant = new QdrantClient({ host: "localhost", port: 6333 });
export const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_KEY,
    model: "text-embedding-ada-002",
});

const app: Express = express();
const port = process.env.PORT || 5001;

const fileStore = FileStore(session);

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(session({
    store: new fileStore({
        path: "./sessions",
        // secret: process.env.SESSION_FILE_SECRET,
        logFn: console.log,
        ttl: 3600 * 7, // 7 days
    }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// register routers
app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/vault", vaultRouter);
app.use("/api/knowledge", knowledgeRouter);
app.use("/api/chat", chatRouter);

try {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
} catch (err) {
    console.error(err)
    process.exit(1)
}
