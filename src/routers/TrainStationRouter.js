import express from "express";
import TrainStationRepository from "../repositories/TrainStationRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
const router = express.Router();
const fetch = require("node-fetch");

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
    return res.status(500).send("Internal server error");
  }
});



router.post("/", async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).send("Image URL is required");
  }

  const response = await fetch(imageUrl);
  const imageData = await response.buffer();

  const image = new Image();
  image.src = imageData;

  const resizedImage = image.resize({ width: 200, height: 200 });

  const trainStation = await TrainStationRepository.createTrainStation({
    ...req.body,
    image: resizedImage.toBuffer(),
  });

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