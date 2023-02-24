const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/event/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  await axios.post("http://localhost:4000/query/" + post_id, req.body);

  res.status(201).send({ event: "OK" });
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
