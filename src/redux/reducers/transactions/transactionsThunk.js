import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from '../../axios';

export const transactionApi = createApi({
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
  tagTypes: ['Transactions', 'Deposits', 'Accounts', 'Currencies'],
  reducerPath: 'transactionApi',
  endpoints: build => ({
    getallTransactionsForUser: build.query({
      query: userId => `/api/userTransactions/${userId}`,
      providesTags: ['Deposits', 'Transactions'],
    }),

    requsestForAmount: build.mutation({
      query: data => ({
        url: `/api/${data.receiverId}/requsestForAmount`,
        method: 'POST',
        body: {
          senderEmail: data.senderEmail,
          amount: data.amount,
          sign: data.sign,
          currencyNickName: data.currencyNickName,
          method:data.method,
          senderName :data.senderName,
          senderPhoneNumber :data.senderPhoneNumber
        },
      }),
      invalidatesTags: ['Transactions'],
    }),

    respondToTransaction: build.mutation({
      query: data => ({
        url: `/api/respondToTransaction/${data.transactionId}`,
        method: 'PATCH',
        body: {
          status: data.status,
        },
      }),
      invalidatesTags: ['Transactions', 'Accounts', 'Currencies', 'Deposits'],
    }),

    getallDepositsForUser: build.query({
      query: id => `/api/${id}/getallDepositsForUser`,
      providesTags: ['Deposits', 'Transactions'],
    }),
    getTraditionalCurrenciesList: build.query({
      query: () => `/api/getTraditionalCurrenciesList`,
      providesTags: ['Transactions', 'Currencies', 'Deposits'],
    }),

    stripPayment: build.mutation({
      query: user => ({
        url: `/api/payment-sheet`,
        method: 'POST',
        body: {
          amount: user.amount,
          currency: user.currency,
        },
      }),
      invalidatesTags: ['Transactions'],
    }),
    savePaymentOnSuccess: build.mutation({
      query: data => ({
        url: `/api/savePaymentOnSuccess`,
        method: 'POST',
        body: {
          userId: data?.userId,
          cardInfo: {
            brand: data.cardInfo.brand,
            country: data.cardInfo.country,
            expMonth: data.cardInfo.expMonth,
            expYear: data.cardInfo.expYear,
            last4: data.cardInfo.last4,
          },
          status: data.status,
          amount: {
            value: data.amount.value,
            sign: data.amount.sign,
          },
          currency: data.currency,
        },
      }),
      invalidatesTags: ['Deposits', 'Accounts'],
    }),
  }),
});

export const {
  useGetallTransactionsForUserQuery,
  useRequsestForAmountMutation,
  useRespondToTransactionMutation,

  useStripPaymentMutation,
  useGetallDepositsForUserQuery,
  useSavePaymentOnSuccessMutation,
  useGetTraditionalCurrenciesListQuery,
} = transactionApi;
