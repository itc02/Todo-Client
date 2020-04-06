import { useState, useEffect } from 'react';
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

export const GetTodos = () => {
  const [ todos, setTodos ] = useState<TodosData[]>([]);
  const [ loading, setLoading ] = useState(false);
  
  const fetchData = () => {
    axios.get<TodosData[]>('http://localhost:3000/todos')
    .then(res => { 
      setTodos(res.data);
      setLoading(true);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { allTodos: todos, loading };
}

interface PostData {
  title: string;
  deadline: Date | null;
  assigned_to: number;
  description: string
}

export const AddTodo = ({title, deadline, assigned_to, description}: PostData) => {
  axios.post<TodosData[]>('http://localhost:3000/todos', { title, deadline, assigned_to, description })
  .catch(err => console.log(err));
}