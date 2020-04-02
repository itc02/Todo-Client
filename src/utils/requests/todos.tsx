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

interface Response {
  data: Array<Data>;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: XMLHttpRequest;
}


export const GetTodos = () => {
  const [ todos, setTodos ] = useState<any>([]);

  const fetchData = async () => {
    const res = await axios.get<Response>('http://localhost:3000/todos');
    setTodos(res.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return todos;
}
