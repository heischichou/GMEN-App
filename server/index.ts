import dotenv from "dotenv";
dotenv.config()
import express from "express";
import { graphql }  from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import cors from "cors";
import bodyParser from "body-parser";
const port = process.env.PORT ?? 5000;
import schema from "./schema/schema";
const router = express.Router();

const root = {
  hello: () => "Hello world!",
};

graphql({
  schema: schema,
  source: "{ hello }",
  rootValue: root,
}).then(response => {
  console.log(response)
})


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: `http://localhost:${port}` }));

app.use("/", router);

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
