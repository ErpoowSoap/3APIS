import express from "express";
import TrainStationRepository from "../repositories/TrainStationRepository.js";
import TrainRepository from "../repositories/TrainRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import TicketRepository from "../repositories/TicketRepository.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { sortBy, order } = req.query;

  try {
    const trainStations = await TrainStationRepository.getTrainStations({
      sortBy: sortBy === "name" ? "name" : undefined,
      order
    });
    res.json(trainStations);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trainStation = await TrainStationRepository.getTrainStationById(id);

    if (!trainStation) {
      return res.status(404).send("Train station not found");
    }

    return res.json(trainStation);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Please put a valid ID" });
  }
});

router.get("/:id/image", async (req, res) => {
  try {
    const { id } = req.params;
    const trainStation = await TrainStationRepository.getTrainStationById(id);

    if (!trainStation) {
      return res.status(404).send("Train station not found");
    }

    return res.json(trainStation);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Please put a valid ID" });
  }
});

router.post("/", adminMiddleware , async (req, res) => {
  try {
    const trainStation = await TrainStationRepository.createTrainStation(req.body);
    res.status(201).json(trainStation);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Invalid input data" });;
  }
});



router.put("/:id",adminMiddleware,  async (req, res) => {
  try {
    const { id } = req.params;
    const trainStation = await TrainStationRepository.updateTrainStation(id, req.body);
    res.json(req.body);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Please put a valid ID" });
  }
});


router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const stationId = req.params.id;
    const trainStation = await TrainStationRepository.getTrainStationById(stationId);

    if (!trainStation) {
      return res.status(404).send("Trainstation not found");
    }
    const stationName = trainStation.name;
    const deletedTrainsIds = await TrainRepository.deleteTrainsByStationName(stationName);
    for (const trainId of deletedTrainsIds) {
      await TicketRepository.deleteTicketsByTrainId(trainId);
    }
    const result = await TrainStationRepository.deleteTrainStation(stationId);

    res.status(200).json({ message: "Train station and associated trains deleted successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Please put a valid ID" });
  }
});



export default router;