const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;
  const post_id = req.params.id;

  const comments = commentsByPostId[req.params.id] || [];

  const new_comment = {
    type: "Comment Created",
    post_id: req.params.id,
    id: commentId,
    comment,
  };

  comments.push(new_comment);

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:3000/event/" + { post_id }, new_comment);

  res.status(201).send(comments);
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
