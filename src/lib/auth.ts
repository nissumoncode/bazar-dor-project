import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("Auth DNS servers:", dns.getServers());
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar-dor-project");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
