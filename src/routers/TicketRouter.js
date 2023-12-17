import express from "express";
import TicketRepository from "../repositories/TicketRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import TrainRepository from "../repositories/TrainRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { employeeMiddleware } from "../middlewares/employeeMiddleware.js";

const router = express.Router();

router.get("/", employeeMiddleware, async (req, res) => {
  try {
    const tickets = await TicketRepository.getTickets();
    res.json(tickets);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", employeeMiddleware, async (req, res) => {
  try {
    const ticket = await TicketRepository.getTicketById(req.params.id);

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.json(ticket);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});


router.post("/", employeeMiddleware,async (req, res) => {
    try {
      const { TrainID, UserID } = req.body;
      const train = await TrainRepository.getTrainById(TrainID);
      if (!train) {
        return res.status(404).send("Train not found");
      }
  
      const user = await UserRepository.getUserById(UserID);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const ticketPayload = {
        userId: UserID,
        trainId: TrainID,
        ...req.body,
      };
    const ticket = await TicketRepository.createTicket(ticketPayload);

    res.status(201).json(ticket);
  } catch (e) {
    console.error(e);
    res.status(500).send("ID is not valid");
  }
});

router.put("/:id", employeeMiddleware, async (req, res) => {
    try {
      const ticketId = req.params.id;
      const existingTicket = await TicketRepository.getTicketById(ticketId);
  
      if (!existingTicket) {
        return res.status(404).send("Ticket not found");
      }
  
      if (existingTicket.isValidated) {
        return res.status(400).send("Ticket has already been validated");
      }
  
      const updatedTicket = await TicketRepository.updateTicket(ticketId, {
        isValidated: true,
      });
  
      res.json(updatedTicket);
    } catch (e) {
        console.error(e);
      res.status(500).send("Internal server error");
    }
  });
  

router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await TicketRepository.getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    await TicketRepository.deleteTicket(ticketId);

    res.status(200).json({ message: "Ticket deleted successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

export default router;