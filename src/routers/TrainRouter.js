import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import TrainStationRepository from "../repositories/TrainStationRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
const router = express.Router();
import TicketRepository from "../repositories/TicketRepository.js";

router.get("/", async (req, res) => {
  const {sortBy, limit, order } = req.query;

  try {
    const trains = await TrainRepository.getTrains({
      sortBy,
      order,
      limit: limit ? parseInt(limit) : 10,
    });
    res.json(trains);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const train = await TrainRepository.getTrainById(id);

    if (!train) {
      return res.status(404).send("Train not found");
    }

    return res.json(train);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});
router.get("/validated/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const trainExists = await TrainRepository.getTrainById(id);
    if (!trainExists) {
      return res.status(404).json({ message: "Train not found" });
    }

    const validatedTickets = await TicketRepository.getValidatedTicketsByTrainId(id);
    if (!validatedTickets.length) {
      return res.status(404).json({ message: "No validated tickets found for the specified train" });
    }

    res.json(validatedTickets);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/", async (req, res) => {
  try {
    const { start_station, end_station } = req.body;

    const startStationExists = await TrainRepository.stationExists(start_station);
    const endStationExists = await TrainRepository.stationExists(end_station);

    if (!startStationExists || !endStationExists) {
      return res.status(400).json({ error: "Invalid start or end station. Please provide existing stations." });
    }

    const createdTrain = await TrainRepository.createTrain(req.body);
    res.status(201).json(createdTrain);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal server error");
  }
});


router.put("/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const train = await TrainRepository.updateTrain(id, req.body);
    res.json(req.body);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Please put a valid ID");
  }
});

router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const trainId = req.params.id;
    const existingTrain = await TrainRepository.getTrainById(trainId);
    if (!existingTrain) {
      return res.status(404).json({ message: "Train not found" });
    }

    await TicketRepository.deleteTicketsByTrainId(trainId);
    const result = await TrainRepository.deleteTrain(trainId);
    res.status(200).json("Train and associated tickets deleted");
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Please put a valid ID " });
  }
});


export default router;
