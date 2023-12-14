import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { startStation, endStation } = req.query;

  const trains = await TrainRepository.getTrains({
    startStation,
    endStation,
  });

  res.json(trains);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const train = await TrainRepository.getTrainById(id);

    if (!train) {
      return res.status(404).send("Train not found");
    }

    res.json(train);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const train = await TrainRepository.createTrain(req.body);

  res.status(201).json(train);
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const train = await TrainRepository.updateTrain(id, req.body);
    res.json(req.body);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  await TrainRepository.deleteTrain(req.params.id);

  res.status(204).send();
});

export default router;
