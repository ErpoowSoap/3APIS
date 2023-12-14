import { describe, it, expect, beforeAll } from "vitest";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import ExerciseModel from "../models/ExerciseModel";

describe("GET /exercises", () => {
  const request = supertest(app);

  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__);
  });

  it("[200] returns an empty list if there is no exercises", async () => {
    const response = await request.get("/exercises").send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("[200] returns a list if there are exercises", async () => {
    const exercise = await ExerciseModel.create({
      nom: "Pompes",
      description: "Toujours plus de pompes",
      difficulte: 5,
      nombreRepetitions: 10,
      muscles: ["triceps", "pectoraux"],
    });
    const response = await request.get("/exercises").send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      nom: "Pompes",
      difficulte: 5,
    });
  });
});
