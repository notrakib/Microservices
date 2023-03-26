const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const posts = {};

app.get("/welcome1", (req, res) => {
  res.send({ welcome: "welcome" });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/send-posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    type: "Post Created",
    id,
    title,
  };

  const response = await axios.post(
    "http://event-bus-clusterip-srv:3000/event/" + id,
    posts[id]
  );

  res.status(201).send({ result: "Post Created" });
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
