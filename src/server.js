const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Подключение к MongoDB
mongoose.connect("mongodb://localhost/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Модели
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
  })
);

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    task: String,
    completed: Boolean,
  })
);

// Маршруты

// Регистрация пользователя
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(201).send(user);
});

// Авторизация
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).send("Неверные данные");
  res.status(200).send(user);
});

// Получение задач
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

// Добавление задачи
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  const todo = new Todo({ task, completed: false });
  await todo.save();
  res.status(201).send(todo);
});

// Изменение задачи
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    id,
    { task, completed },
    { new: true }
  );
  res.status(200).send(todo);
});

// Удаление задачи
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(204).send();
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
