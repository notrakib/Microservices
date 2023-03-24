const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get("/welcome1", (req, res) => {
  res.send({ welcome: "welcome" });
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
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
