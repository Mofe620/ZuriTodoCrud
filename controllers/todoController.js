const mongodb = require("mongodb");
const client = mongodb.MongoClient;
let db;
let connectionString = `mongodb://localhost:27017/todo`;
client.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    if (error) throw error;
    db = client.db("todocrud");
  }
);

exports.displayTasks = (req, res) => {
  db.collection("todo")
    .find({})
    .toArray(function (error, tasks) {
      if (error) throw error;
      res.send(tasks);
    });
};

exports.addTodo = (req, res) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
    timestamp: new Date(),
  };
  db.collection("todo").insertOne(newTask, function (error, result) {
    if (error) throw error;
    res.send(`New task ${newTask.title} added.`);
  });
};

exports.updateTodo = (req, res) => {
  const queryObject = { title: req.body.title };
  const newValues = {
    $set: { description: req.body.description, timestamp: new Date() },
  };
  db.collection("todo").updateOne(
    queryObject,
    newValues,
    function (error, result) {
      if (error) throw error;
      res.send("Task updated.");
    }
  );
};

exports.deleteTodo = (req, res) => {
    const queryObject = { title: req.body.title };
    db.collection("todo").deleteOne(queryObject, function(error, result) {
      if (error) throw error;
      res.send("Task deleted");
    });
};
