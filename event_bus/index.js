const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

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

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/event/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  // await axios.post("http://localhost:4000/query/" + post_id, req.body);
  console.log(post_id, req.body);
  res.json({ event: post_id });
});

app.listen(3100, () => {
  console.log("Listening on 3000");
});
