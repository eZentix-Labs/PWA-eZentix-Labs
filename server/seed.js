import "dotenv/config";
import mongoose from "mongoose";
import Link from "./models/Link.js";
import { seedLinks } from "./data/links.seed.js";

await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stv-web");
await Link.deleteMany({});
await Link.insertMany(seedLinks);
console.log(`Seeded ${seedLinks.length} links`);
await mongoose.disconnect();
