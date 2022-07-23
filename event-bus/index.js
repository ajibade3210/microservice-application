const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    .post("http://localhost:5000/events", event)
    .then((res) => {
      console.log("EventBus Received New Comment");
    })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:7000/events", event)
    .then((res) => {
      console.log("EventBus Received New PostCommentQuery");
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.send({ status: "OK" });
});

app.listen(5500, () => {
  console.log("Listening On 5500");
});
