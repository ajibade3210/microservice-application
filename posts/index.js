const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  try {
    res.send(posts);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://localhost:5500/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .then((res) => {
      console.log("Post Event Created");
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Post Recieved Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening On 4000");
});
