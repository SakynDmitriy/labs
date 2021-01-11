const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.get("/students",async(req, res)=>{
  try{
    const allStudents = await pool.query("SELECT * FROM students");
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/students/:id",async(req, res)=>{
  try{
    const { id }  = req.params;
    const Student = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    res.json(Student.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/students",async (req, res)=>{
  try{
    const { first_name, last_name, group_name } = req.body;
    const newStudents = await pool.query(
      "INSERT INTO students (first_name, last_name, group_name, created_at, updated_at) VALUES ($1, $2, $3, current_timestamp, current_timestamp) RETURNING *",
      [first_name, last_name, group_name]
    );
    res.json(newStudents.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/students/:id",async (req, res)=>{
  try{
    const { first_name, last_name, group_name, created_at, updated_at} = req.body;
    const id = req.params.id;
    const newStudents = await pool.query(
      "UPDATE students SET first_name = $1, last_name = $2, group_name = $3, created_at = $4, updated_at = $5 WHERE id = $6 RETURNING *",
      [first_name, last_name, group_name, created_at, updated_at, id]
    );
    res.json(newStudents.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/students/:id",async (req, res)=>{
  try{
    const id = req.params.id;
    const delStudents = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(delStudents.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000);