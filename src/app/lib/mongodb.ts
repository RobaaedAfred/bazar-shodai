import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

export const client =
  globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db(
  process.env.MONGODB_DB_NAME || "bazarshodai"
);