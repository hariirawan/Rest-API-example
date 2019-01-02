const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost:27017/testing");
mongoose.Promise = global.Promise;

const Users = require("./model/m_users");
const { success, notFound, badRequest } = require("./response");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    exposedHeaders: true
  })
);

app.get("/users", (req, res, next) => {
  Users.find()
    .then(response => {
      let data = [];
      response.map(row => {
        data.push({
          id: row._id,
          name: row.name
        });
      });
      success(res, data);
    })
    .catch(e => {
      badRequest(res, e);
    });
});

app.get("/users/:id", ({ params }, res, next) => {
  Users.findById({ _id: params.id })
    .then(data => {
      if (data)
        success(res, {
          id: data._id,
          name: data.name
        });
      else notFound(res);
    })
    .catch(e => {
      badRequest(res, e.message);
    });
});

app.post("/users", ({ body }, res) => {
  Users.create(body)
    .then(data => {
      success(res, {
        id: data._id,
        name: data.name
      });
    })
    .catch(e => {
      badRequest(res, e.message);
    });
});

app.put("/users/:id", ({ params, body }, res) => {
  Users.findByIdAndUpdate({ _id: params.id }, body)
    .then(data => {
      if (data)
        success(res, {
          id: data._id,
          name: data.name
        });
      else notFound(res);
    })
    .catch(e => {
      badRequest(res, e.message);
    });
});

app.delete("/users/:id", ({ params }, res) => {
  Users.findByIdAndDelete({ _id: params.id })
    .then(data => {
      success(res, {
        id: data._id,
        name: data.name
      });
    })
    .catch(e => {
      badRequest(res);
    });
});

app.listen(9000, () => {
  console.log("server is running");
});
