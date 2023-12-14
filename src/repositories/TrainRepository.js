import { TrainModel } from "../models/TrainModel.js";

class TrainRepository {
  async getTrains({ startStation, endStation }) {
    const query = {};

    if (startStation) {
      query.start_station = startStation;
    }

    if (endStation) {
      query.end_station = endStation;
    }

    return await TrainModel.find(query);
  }

  async createTrain(payload) {
    const train = await TrainModel.create(payload);

    return train;
  }

  async getTrainById(id) {
    return await TrainModel.findById(id);
  }

  async updateTrain(id, payload) {
    const newTrain = await TrainModel.findOneAndUpdate(
      {
        _id: id,
      },
      payload
    );

    return newTrain;
  }

  async deleteTrain(id) {
    await TrainModel.deleteOne({ _id: id });
  }
}

export default new TrainRepository();
