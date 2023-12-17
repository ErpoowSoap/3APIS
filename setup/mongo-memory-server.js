import { afterAll, beforeAll } from "vitest";
import { setup, teardown } from "vitest-mongodb";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = await MongoMemoryServer.create();

beforeAll(async () => {
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
});
