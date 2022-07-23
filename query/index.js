const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

//Quick Example Of Post Structure
/**
 * posts == {
 * "j452j5": {
 *      id: "j452j5",
 *      title: "post title",
 *      comments: [
 *          {id: "kl3lk", content:"comment"}
 *       ]
 * }
 * }
 */

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);
  res.send({});
});

//Link Query Event To Client
app.listen(7000, () => {
  console.log("Listening on Port: 7000");
});
