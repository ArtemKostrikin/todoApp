import React, { useState } from "react";
import { addTodo } from "../services/api";

const AddTodo = () => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация ввода
    if (!task.trim()) {
      alert("Task cannot be empty!"); // Если задача пустая, показываем предупреждение
      return; // Выход из функции, если задача пустая
    }

    try {
      const newTodo = await addTodo({ task }); // Отправка задачи на сервер
      console.log("Added todo:", newTodo); // Логирование добавленной задачи
      setTask(""); // Очистка поля ввода после добавления
    } catch (error) {
      console.error("Failed to add todo:", error); // Логирование ошибки, если запрос не удался
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTodo;
