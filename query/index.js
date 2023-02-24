const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const posts_comments = {};

app.post("/query/:post_id", async (req, res) => {
  if (req.body.type === "Post Created") {
    console.log(req.body);
  }
  if (req.body.type === "Comment Created") {
    console.log(req.body);
  }

  res.send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
