import mongoose from "mongoose";

const TrainStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  open_hour: { type: String, required: true },
  close_hour: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const TrainStationModel = mongoose.model("TrainStation", TrainStationSchema);

  export default TrainStationModel;
