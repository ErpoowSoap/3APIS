import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { employeeMiddleware } from "../middlewares/employeeMiddleware.js";
import { z, object, string, array } from "zod";
import { processRequestBody } from "zod-express-middleware";
import { UserModel } from "../models/UserModel.js";
import passport from "../passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", employeeMiddleware, async (req, res) => {
  const users = await UserRepository.listUsers();
  res.json(users);
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

router.put("/:id", async (req, res) => {
  const Usermodify = req.user && (req.user.id === req.params.id || req.user.role === "Admin");
  const isAdmin = req.user && req.user.role === "Admin";

  if (Usermodify && (isAdmin || req.body.username || req.body.name)) {
    try {
      const { id } = req.params;
      const updatedUser = await UserRepository.updateUser(id, req.body);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(updatedUser);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Internal server error");
    }
  } else {
    return res.status(403).json({ error: "Permission denied" });
  }
});


router.post("/login", passport.authenticate("local"), async (req, res) => {
  const user = await UserModel.findOne(
    { username: req.body.username },
    { username: 1, role: 1 },
  );
  
  const payload = {
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, 'ProjetRailRoad');

  res.cookie("authorization", token, {httpOnly : true});

  res.status(200).json({ token: token, message: "Logged" });
});

router.delete("/:id", async (req, res) => {
  const currentUserId = req.user.id;
  const userIdToDelete = req.params.id;

  if (currentUserId === userIdToDelete) {
    await UserRepository.deleteUser(req.params.id);

    res.status(204).send("delete");
  } else {
    return res.status(403).json({ error: "Permission denied" });
  }
});

/*
const UserCreationPayload = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string().min(8),
});
router.post("/", processRequestBody(UserCreationPayload), async (req, res) => {
  const payload = req.body;

  const user = await UserRepository.createUser({
    role: "User",
    ...payload,
  });

  res.status(201).json(user);
  
});*/


export default router;
