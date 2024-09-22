import { User } from '../models/user';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/src/data/users.json');
  return response.json();
};
