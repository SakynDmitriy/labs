const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.text());

let massive = ["Hello", "World"];

app.get("/list", function (req, res) {
  res.send(massive);
  res.end();
});

app
  .post("/create", function (req, res) {
    massive.push(req.body);
    res.end();
  })
  .listen(8080);
