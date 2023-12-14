import express from "express";
import TrainStationRepository from "../repositories/TrainStationRepository.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const trainStations = await TrainStationRepository.getTrainStations();
  res.json(trainStations);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trainStation = await TrainStationRepository.getTrainStationById(id);

    if (!trainStation) {
      return res.status(404).send("Train station not found");
    }

    res.json(trainStation);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const trainStation = await TrainStationRepository.createTrainStation(req.body);
  res.status(201).json(trainStation);
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trainStation = await TrainStationRepository.updateTrainStation(id, req.body);
    res.json(req.body);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  await TrainStationRepository.deleteTrainStation(req.params.id);
  res.status(204).send();
});

export default router;
