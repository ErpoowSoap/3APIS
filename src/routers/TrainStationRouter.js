import express from "express";
import TrainStationRepository from "../repositories/TrainStationRepository.js";
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



router.post("/",adminMiddleware, async (req, res) => {
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
    return res.status(500).send("Internal server error");
  }
});


router.delete("/:id",adminMiddleware, async (req, res) => {
  try {
    const result = await TrainStationRepository.deleteTrainStation(req.params.id);
    res.status(200).json("train station deleted or didn't exist");
  } catch (error) {
    res.status(404).json({ message: "Internal server error"});
  }
});


export default router;