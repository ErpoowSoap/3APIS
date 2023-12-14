import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { z, object, string, array } from "zod";
import { processRequestBody } from "zod-express-middleware";
import { UserModel } from "../models/UserModel.js";
import passport from "../passport.js";

const router = express.Router();

router.get("/", adminMiddleware, async (req, res) => {
  const users = await UserRepository.listUsers();
  res.json(users);
});

const UserCreationPayload = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string().min(8),
});

const UserRegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
});

router.post("/register", processRequestBody(UserRegisterSchema), (req, res) => {
  UserModel.register(
    new UserModel({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      role: "User",
    }),
    req.body.password,
    (err, account) => {
      if (err) {
        console.error(err);
        return res.status(400).json(err);
      }

      passport.authenticate("local")(req, res, () => {
        res.status(201).send("Created");
      });
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("Logged");
});

router.post("/", processRequestBody(UserCreationPayload), async (req, res) => {
  const payload = req.body;

  const user = await UserRepository.createUser({
    role: "User",
    ...payload,
  });

  res.status(201).json(user);
});

export default router;
