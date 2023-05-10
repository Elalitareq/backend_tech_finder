import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export const configureSessionMiddleware = () => {
  return session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://techfinder:techpassword@cluster0.eni99fw.mongodb.net/?retryWrites=true&w=majority",
      mongooseConnection: mongoose.connection,
      collection: "sessions",
    }),

    cookie: {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  });
};
