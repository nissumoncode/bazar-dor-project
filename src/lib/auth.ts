import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar_dor");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
