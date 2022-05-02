import { createContext } from 'react';

//Here we can get the user and username globally 
export const UserContext = createContext({ user: null, username: null });