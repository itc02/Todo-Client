import { useState, useEffect } from 'react';
import { routes } from '../../config/constants';
import axios from 'axios';

export interface TodosData {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  user_id: number;
  state: string;
  user_name: string
}

// Lowercase
export const GetTodos = () => {
  const [todos, setTodos] = useState<TodosData[]>([]);

  const fetchData = () => {
    axios.get<TodosData[]>(`${routes.server}/${routes.todos}`).then(res => {
      setTodos(res.data)
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return todos;
}

interface PostData {
  title: string;
  deadline: Date | null;
  assigned_to: number;
  description: string
}

export const addTodo = ({title, deadline, assigned_to, description}: PostData) => {
  return axios.post<TodosData[]>(`${routes.server}/${routes.todos}`, { title, deadline, assigned_to, description })
  .catch(err => console.log(err));
}