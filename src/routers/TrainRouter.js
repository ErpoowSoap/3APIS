import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
const router = express.Router();

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
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});




router.post("/", adminMiddleware, async (req, res) => {
  const train = await TrainRepository.createTrain(req.body);

  res.status(201).json(train);
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

router.delete("/:id", async (req, res) => {
  try {
    const trainId = req.params.id;
    const existingTrain = await TrainRepository.getTrainById(trainId);
    if (!existingTrain) {
      return res.status(404).json({ message: "Train not found" });
    }
    const result = await TrainRepository.deleteTrain(req.params.id);
    res.status(200).json("train deleted or didn't exist");
  } catch (error) {
    res.status(404).json({ message: "Internal server error"});
  }
});


export default router;
