// import express from "express";
const express = require("express");
const Mongoose = require("mongoose");
const Messages = require("./dbMessages");
const Pusher = require("pusher");

const cors = require("cors");

// console.log(Messages);

// app config
const app = express();
const port = 9000;

const pusher = new Pusher({
  appId: "1258221",
  key: "f93173d4a898e9baac40",
  secret: "a9fab2daddccf67ed9f0",
  cluster: "ap2",
  useTLS: true
});

//middleware
app.use(express.json());

app.use(cors());

//DB config
const connection_url =
  "mongodb+srv://admin:0GJ4M01jgLeUeLNs@cluster0.0cydv.mongodb.net/ChatterDB?retryWrites=true&w=majority";
Mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("mongoose connection created"))
  .catch(e => console.log(e));

const db = Mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  // console.log(msgCollection);
  const changeStream = msgCollection.watch();
  // console.log(changeStream);
  changeStream.on("change", change => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      console.log("details", messageDetails.user, messageDetails.message);
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp:messageDetails.timestamp,
        received:messageDetails.received,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

// api rouutes

app.get("/", (req, res) => res.status(200).send("hello world!"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err,data)=>{
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  })
});

app.post("/messages/new", (req, res) => {
  const msg = req.body;
  // console.log("**********", msg);

  Messages.create(msg, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
  // res.status(201).send("niranjan")
});

// listen

app.listen(port, () => {
  console.log(`listening at localhost:${port}`);
});

//0GJ4M01jgLeUeLNs
