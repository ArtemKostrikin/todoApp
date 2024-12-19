import { createContext, useContext } from "react";

// Определение типа User
export interface User {
  id: string;
  email: string;
}

// Тип для контекста авторизации
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Создание контекста
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
