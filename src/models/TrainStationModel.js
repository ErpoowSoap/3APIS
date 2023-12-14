import mongoose from "mongoose";

const TrainStationSchema = new mongoose.Schema({
    Nom: { type: String, required: true },
    open_hour: { type: String, required: true },
    close_hour: { type: String, required: true },
    image: { type: String, required: true },
  });
  
  export const TrainStationModel = mongoose.model("TrainStation", TrainStationSchema);
  
  export default TrainStationModel;
