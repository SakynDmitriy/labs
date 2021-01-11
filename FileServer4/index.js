const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
let app = express();
var word = JSON.parse(fs.readFileSync('students.json'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true }));

app.get('/students', function(req, res) {
  res.send(word);
});

app.get('/students/:id', function(req, res) { 
  var student = word.find((student) => student.id === Number(req.params.id));
  res.send(student);
});

app.post('/students', function(req, res) { 
var student = {
	id: word.length+1,
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	group: req.body.group,
	createdAt: Date.now(), 
	updatedAt: Date.now()
};
word.push(student);
var data = JSON.stringify(word);
fs.writeFileSync('students.json',data);
res.send('Add Done');
});

app.put('/students/:id', function(req, res) { 
  var student = word.find((student) => student.id === Number(req.params.id));
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.group = req.body.group;

  var data = JSON.stringify(word);
  fs.writeFileSync('students.json',data);
  res.send('Reduct Done');
});


app.delete('/students/:id', function(req, res) {
  word = word.filter((word)=>word.id !== Number(req.params.id));
  var data = JSON.stringify(word);
  fs.writeFileSync('students.json',data);
  res.send('Delete Done');
});

app.listen(3000);