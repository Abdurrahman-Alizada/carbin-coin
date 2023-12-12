import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://caribcoin-backend.vercel.app',
  });
  
// export const baseURL = 'https://caribcoin-backend.vercel.app'

// for developemtn ngrok is used because local server like localhost:3000 is not working in react native
export const baseURL = 'https://b092-103-149-240-110.ngrok-free.app'
