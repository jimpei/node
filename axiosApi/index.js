const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const axiosBase = require("axios");

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

// curl -X GET http://localhost:3000/api/single | jq
app.get("/api/single", (req, res) => {
  const axios = axiosBase.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    responseType: "json"
  });
  axios
    .get("/posts/1")
    .then(function(response) {
      console.log("debug 1");
      console.log(response.data);
      return response.data;
    })
    .then(function(data) {
      console.log("debug 2");
      console.log(data);
      res.send(data);
    })
    .catch(function(error) {
      console.log("ERROR!! occurred in Backend.");
      res.send("error");
    });
});

app.get("/api/double", async (req, res) => {
  console.log("debug asyncCall start");
  const titles = await asyncCall();
  console.log(titles);
  console.log("debug asyncCall end");

  res.send("ok");
});

async function asyncCall() {
  const axios = axiosBase.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    responseType: "json"
  });

  const axiosSleep = axiosBase.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    responseType: "json"
  });

  console.log("debug start");
  // 検証のため、スリープ機能付きローカルAPIを叩いている
  const title1 = await axiosSleep
    .get("/api/sleep/2000")
    .then(function(response) {
      console.log("api 1 done");
      return response.data;
    })
    .catch(function(error) {
      console.log("ERROR!! occurred in Backend.");
      return "error";
    });

  // 1個目のAPIが完了したあとに、APIが実行される
  const title2 = await axios
    .get("/posts/2")
    .then(function(response) {
      console.log("api 2 done");
      return response.data;
    })
    .catch(function(error) {
      console.log("ERROR!! occurred in Backend.");
      return "error";
    });

  const titles = {
    memo1: title1,
    memo2: title2
  };

  return titles;
}

app.get("/api/double/asyncAll", async (req, res) => {
  console.log("debug asyncAll asyncCall start");
  const titles = await asyncAllCall();
  console.log(titles);
  console.log("debug asyncAll asyncCall end");

  res.send("ok");
});

async function asyncAllCall() {
  const axios = axiosBase.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    responseType: "json"
  });

  const axiosSleep = axiosBase.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    responseType: "json"
  });

  console.log("debug start");
  // 検証のため、スリープ機能付きローカルAPIを叩いている
  const title1 = axiosSleep
    .get("/api/sleep/2000")
    .then(function(response) {
      console.log("api 1 done");
      return response.data;
    })
    .catch(function(error) {
      console.log("ERROR!! occurred in Backend.");
      return "error";
    });

  // 1個目のAPIの完了を待たずに、とりあえず2個目のAPIを投げる
  const title2 = axios
    .get("/posts/2")
    .then(function(response) {
      console.log("api 2 done");
      return response.data;
    })
    .catch(function(error) {
      console.log("ERROR!! occurred in Backend.");
      return "error";
    });

  // APIの結果格納時のみ同期を取る
  const titles = {
    memo1: await title1,
    memo2: await title2
  };

  return titles;
}

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
