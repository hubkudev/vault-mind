import "dotenv/config"
import express, { Express } from "express";
import indexRouter from "./routes/router";
import authRouter from "./routes/auth";
import session from "express-session";
import passport from "./lib/auth";
import FileStore from "session-file-store";

const app: Express = express();
const port = process.env.PORT || 5001;

const fileStore = FileStore(session);

app.use(express.json());
app.use(session({
    store: new fileStore({
        path: "./sessions",
        secret: process.env.SESSION_FILE_SECRET,
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

try {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
} catch (err) {
    console.error(err)
    process.exit(1)
}
