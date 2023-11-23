import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userAccounts: {},
};

export const AccountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    handleUserAccounts: (state, action) => {
      state.userAccounts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleUserAccounts} = AccountSlice.actions;

export default AccountSlice.reducer;
