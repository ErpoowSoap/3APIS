import mongoose from "mongoose";

console.log("Connecting to MongoDB");
export const client = await mongoose.connect(
  "mongodb+srv://Admin:1234@projectrailroad.jqxb6pg.mongodb.net/",
  {
    serverSelectionTimeoutMS: 5000,
  }
);
console.log("Connected to MongoDB");
