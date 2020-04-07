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
export const useTodos = () => {
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
