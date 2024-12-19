import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import AddTodo from "../components/AddTodo";
import { fetchTodos } from "../services/api";

// Типы для задачи
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos); // Получаем задачи из API при загрузке страницы
  }, []);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Список задач</h1>

      {/* Компонент для добавления задач */}
      <AddTodo />

      {/* Отображение задач в виде списка */}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoListPage;
