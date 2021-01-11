const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let students = [
  {
    id: 0,
    firstName: "Sakun",
    lastName: "Dmitriy",
    group: "VPI32",
    createdAt: "2020-03-02T12:41:09.533Z",
    updatedAt: "2020-03-02T12:45:02.121Z"
  },
  {
    id: 1,
    firstName: "Lamarenko",
    lastName: "Nikitich",
    group: "VPI32",
    createdAt: "2020-03-02T12:41:09.533Z",
    updatedAt: "2020-03-02T12:45:02.121Z"
  }
];
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(201).send("Created");
});

app.get("/students", (req, res) => {
  if (students.length === 0)
    res.status(404).send("Error: the source array is empty");
  else res.send(students);
});

app.get("/students/:id", (req, res) => {
  if (students.length === 0)
    res.status(404).send("Error: the source array is empty");
  else if (req.params.id >= students.length)
    res.status(404).send("Error: the object is not found!");
  else if (req.params.id < 0) res.status(400).send("Error: invalid index");
  else {
    let student = students.find((student) => {
      return student.id === Number(req.params.id);
    });
    res.status(200).send(student);
  }
});

app.post("/students", (req, res) => {
  let student = {
    id: students.length,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    group: req.body.group,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  students.push(student);

  res.status(200).send("Added");
});

app.put("/students/:id", (req, res) => {
  if (students.length === 0)
    res.status(404).send("Error: the source array is empty");
  else if (req.params.id >= students.length)
    res.status(404).send("Error: the object is not found!");
  else if (req.params.id < 0) res.status(400).send("Error: invalid index");
  else {
    let student = students.find((item) => item.id.toString() === req.params.id);
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.group = req.body.group;
    student.updatedAt = new Date();
    res.status(201).send("Updated!");
  }
});

app.delete("/students/:id", (req, res) => {
  if (students.length === 0)
    res.status(404).send("Error: the source array is empty");
  else if (req.params.id >= students.length)
    res.status(404).send("Error: the object is not found!");
  else if (req.params.id < 0) res.status(400).send("Error: invalid index");
  else {
    students.splice(req.params.id, 1);
    for (let i = req.params.id; i < students.length; i++) students[i].id--;
    res.status(200).send("Deleted");
  }
});

app.listen(8080, () => {
  console.log("Loading...");
});
