import { useState, useEffect } from 'react';
import axios from 'axios';

export interface UsersData {
  id: number;
  user_name: string;
}

export const GetUsers = () => {
  const [ users, setUsers ] = useState<UsersData[]>([]);

  const fetchData = () => {
    axios.get<UsersData[]>('http://localhost:3000/users')
    .then(res => { setUsers(res.data) })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return users;
}