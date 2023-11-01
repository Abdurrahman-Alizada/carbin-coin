import {configureStore} from '@reduxjs/toolkit';
import {userApi} from './reducers/user/userThunk';
import userReducer from './reducers/user/user';
// import {groupApi} from './reducers/groups/groupThunk';
// import {TasksApi} from './reducers/groups/tasks/taskThunk';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // groups: groupReducer,
    // tasks: taskReducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [groupApi.reducerPath]: groupApi.reducer,
    // [TasksApi.reducerPath]: TasksApi.reducer,
  },

  middleware: getdefaultMiddleware =>
    getdefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
    //   groupApi.middleware,
    //   TasksApi.middleware,
    ]),
});
