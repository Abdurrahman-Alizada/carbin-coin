import {configureStore} from '@reduxjs/toolkit';

import {userApi} from './reducers/user/userThunk';
import userReducer from './reducers/user/user';

import {settingApi} from './reducers/settings/settingsThunk';
import settingReducer from './reducers/settings/settings';

import {ChatApi} from './reducers/chat/chatThunk';
import chatReducer from './reducers/chat/chatSlice';

import {transactionApi} from './reducers/transactions/transactionsThunk';
import transactionReducer from './reducers/transactions/transactions';

import {accountsApi} from './reducers/accounts/accountsThunk';
import accountReducer from './reducers/accounts/accountSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingReducer,
    chat: chatReducer,
    transaction: transactionReducer,
    accounts: accountReducer,

    [userApi.reducerPath]: userApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
  },

  middleware: getdefaultMiddleware =>
    getdefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      settingApi.middleware,
      transactionApi.middleware,
      accountsApi.middleware,
    ]),
});
