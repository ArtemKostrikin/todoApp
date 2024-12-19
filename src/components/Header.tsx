import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return null; // Без контекста ничего не рендерим
  }

  const { user, logout } = context;

  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        {user ? (
          <button onClick={logout}>Выйти</button>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;