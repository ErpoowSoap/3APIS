import passport from "passport";
import { UserModel } from "./models/UserModel.js";
import LocalStrategy from "passport-local";

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export default passport;
