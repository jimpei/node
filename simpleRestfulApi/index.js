const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// datasource
const courses = [
  { id: 1, name: "hoge" },
  { id: 2, name: "fuga" },
  { id: 3, name: "piyo" }
];

// エントリポイント
// curl -X GET http://localhost:3000
app.get("/", (req, res) => {
  res.send("Simple REST API");
});

// curl -X GET http://localhost:3000/api/courses | jq
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// curl -X GET http://localhost:3000/api/sleep/:timeout | jq
app.get("/api/sleep/:timeout", (req, res) => {
  console.log(req.params.timeout);
  setTimeout(() => {
    res.send(courses);
  }, req.params.timeout);
});

// curl -X POST http://localhost:3000/api/courses -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "tanaka" }'
app.post("/api/courses", (req, res) => {
  console.log("debug");
  console.log(req.body);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);

  res.send(course);
});

// curl -X PUT http://localhost:3000/api/courses/4 -H "Accept: application/json" -H "Content-type: application/json" -d '{ "name" : "yamamoto" }'
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send("The course with the given ID was not found.");
  }

  course.name = req.body.name;
  res.send(course);
});

// curl -X DELETE http://localhost:3000/api/courses/2
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send("The course with the given ID was not found.");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});
