import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { graphql } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import schema from "./schema/schema";

const port = process.env.PORT ?? 5000;
const router = express.Router();

const root = {
  server_status: () => "Server is live.",
};

graphql({
  schema: schema,
  source: "{ server_status }",
  rootValue: root,
}).then((response) => {
  console.log(response);
});

const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: `http://localhost:${port}` }));

app.use("/", router);

// DB
mongoose.connect(process.env.MONGO_URI as string);

const db = mongoose.connection;
db.on("error", console.error.bind("console", "Connection error..."));
db.once("open", () => {
  console.log(`MongoDB successfully connected: ${db.host}`);
});

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
