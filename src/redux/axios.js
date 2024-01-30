import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://caribcoin-backend.vercel.app',
  });
  
export const baseURL = 'https://caribcoin-backend.vercel.app'

// for developemtn ngrok is used because local server like localhost:3000 is not working in react native
// export const baseURL = 'https://ac48-111-119-189-20.ngrok-free.app'
