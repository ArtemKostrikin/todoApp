import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);

  // Хук вызывается в начале компонента
  const navigate = useNavigate();

  if (!context) {
    return <p>Ошибка: Контекст авторизации недоступен.</p>;
  }

  const { login } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginUser(email, password);
    login(user);
    navigate("/"); // Навигация после авторизации
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
