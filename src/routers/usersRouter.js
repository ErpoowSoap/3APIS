import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { employeeMiddleware } from "../middlewares/employeeMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { z, object, string, array } from "zod";
import { processRequestBody } from "zod-express-middleware";
import { UserModel } from "../models/UserModel.js";
import passport from "../passport.js";
import jwt from "jsonwebtoken";
import TicketRepository from "../repositories/TicketRepository.js";

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
        res.status(201).send("created");
      });
    }
  );
});

router.get("/:id",employeeMiddleware, async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
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
      console.error(e);
      return res.status(500).send("Internal server error");
    }
  } else {
    return res.status(403).json({ error: "Permission denied" });
  }
});


router.post("/login", passport.authenticate("local"), async (req, res) => {
  const user = await UserModel.findOne(
    { username: req.body.username },
    { id: 1,username: 1, role: 1 },
  );
  
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, 'ProjetRailRoad');

  res.cookie("authorization", token, {httpOnly : true});

  res.status(200).json({ token: token, message: "Logged" });
});

router.delete("/:id",tokenMiddleware, async (req, res) => {
  const currentUserId = req.user.id;
  const userIdToDelete = req.params.id;

  if (currentUserId === userIdToDelete) {
    await UserRepository.deleteUser(req.params.id);
    await TicketRepository.deleteTicketsByUserId(currentUserId);
    res.status(200).json({ message: "User deleted." });
  } else {
    return res.status(403).json({ error: "Permission denied" });
  }
});


export default router;
