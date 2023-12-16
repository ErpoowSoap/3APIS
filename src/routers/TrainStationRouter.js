import express from "express";
import TrainStationRepository from "../repositories/TrainStationRepository.js";
import TrainRepository from "../repositories/TrainRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
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

router.post("/", async (req, res) => {
  const trainStation = await TrainStationRepository.createTrainStation(req.body);
  res.status(201).json(trainStation);
});


router.put("/:id",adminMiddleware,  async (req, res) => {
  try {
    const { id } = req.params;
    const trainStation = await TrainStationRepository.updateTrainStation(id, req.body);
    res.json(req.body);
  } catch (e) {
    console.log(e);
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
    await TrainRepository.deleteTrainsByStationName(stationName);
    const result = await TrainStationRepository.deleteTrainStation(stationId);

    res.status(200).json({ message: "Train station and associated trains deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Please put a valid ID" });
  }
});



export default router;