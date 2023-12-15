import { TrainModel } from "../models/TrainModel.js";

class TrainRepository {
  async getTrains({ sortBy, order, limit }) {
    const query = {};
    const findQuery = TrainModel.find(query);

    if (sortBy) {
      const sortOptions = {};
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
      findQuery.sort(sortOptions);
    }

    if (limit) {
      findQuery.limit(limit);
    }

    return await findQuery.exec();
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
