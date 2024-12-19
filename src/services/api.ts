import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Убедитесь, что URL правильный
});

export const fetchTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const addTodo = async (todo: { task: string }) => {
  const response = await api.post('/todos', todo);
  return response.data;
};

// Логин и регистрация
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data.user;
};

export const registerUser = async (email: string, password: string) => {
  const response = await api.post('/register', { email, password });
  return response.data.user;
};
