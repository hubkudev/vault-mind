import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { AUTH_PROVIDER } from "../constants";

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    }, async (_, __, profile, done) => {
        try {
            if (!profile?.emails?.length) return done(null, undefined);

            const email = profile.emails[0].value;
            const username = profile.displayName;

            // check if user with the email exist or not
            const existingUser = await db.select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .get();

            if (existingUser) return done(null, existingUser);

            // insert a new user where it does not exist
            const [newUser] = await db.insert(usersTable).values({
                username: username,
                email: email,
                provider: AUTH_PROVIDER.GOOGLE,
                profilePicture: profile.photos ? profile.photos[0].value : "",
            }).returning();

            done(null, newUser);
        } catch (error) {
            console.error("Google OAuth Error:", error);
            return done(error, undefined);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user as Express.User);
});

export default passport;
