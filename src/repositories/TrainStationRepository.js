import { TrainStationModel } from "../models/TrainStationModel.js";

class TrainStationRepository {
  async getTrainStations({ sortBy, order }) {
    const sortOptions = {};
  
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }
  
    return TrainStationModel.find().sort(sortOptions);
  }
  

  async createTrainStation(payload) {
    const trainStation = await TrainStationModel.create(payload);
    return trainStation;
  }
  async getTrainStationById(id) {
    return await TrainStationModel.findById(id);
  
  }

  
  async updateTrainStation(id, payload) {
    const newTrainStation = await TrainStationModel.findOneAndUpdate(
      {
        _id: id,
      },
      payload
    );

    return newTrainStation;
  }

  async deleteTrainStation(id) {
    await TrainStationModel.deleteOne({ _id: id });
  }
}

export default new TrainStationRepository();
