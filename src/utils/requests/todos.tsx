import { useState, useEffect } from 'react';
import axios from 'axios';

interface Data {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  user_id: number;
  state: string;
  user_name: string
}

export const GetTodos = () => {
  const [ todos, setTodos ] = useState<Data[]>([]);

  const fetchData = () => {
    axios.get<Data[]>('http://localhost:3000/todos')
    .then(res => { setTodos(res.data) })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return todos;
}
