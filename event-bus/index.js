const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  axios
    .post("http://localhost:4000/events", event)
    .then((res) => {
      console.log("EventBus Received New Post");
    })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:4001/events", event)
    .then((res) => {
      console.log("EventBus Received New Comment");
    })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:4002/events", event)
    .then((res) => {
      console.log("EventBus Received New PostCommentQuery");
    })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:4003/events", event)
    .then((res) => {
      console.log("Moderation Received");
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening On 4005");
});
