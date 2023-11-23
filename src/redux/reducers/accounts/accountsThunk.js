import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from '../../axios';

export const accountsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [ 'Accounts'],
  reducerPath: 'accountsApi',
  endpoints: build => ({
    getAccountsForUser: build.query({
      query: userId => `/api/${userId}/getAccountsForUser`,
      providesTags: ['Accounts'],
    }),

  }),
});

export const {
  useGetAccountsForUserQuery,
} = accountsApi;
