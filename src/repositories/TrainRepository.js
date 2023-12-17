import { TrainModel } from "../models/TrainModel.js";
import { TrainStationModel } from "../models/TrainStationModel.js"
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
  async stationExists(stationName) {
    try {
      const station = await TrainStationModel.findOne({ name: stationName });

      return !!station; 
    } catch (error) {
      console.error(error);
      throw new Error("Error checking if station exists");
    }
  }

  async getTrainById(id) {
    return await TrainModel.findById(id);
  }
 


  async deleteTrainsByStationName(stationName) {
    const deletedTrains = await TrainModel.find({
      $or: [{ start_station: stationName }, { end_station: stationName }],
    });
    const deletedTrainIds = deletedTrains.map(train => train._id);
  
    await TrainModel.deleteMany({
      $or: [{ start_station: stationName }, { end_station: stationName }],
    });
  
    return deletedTrainIds;
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
