import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentLoginUser: {},
};

export const TransactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    handleCurrentLoaginUser: (state, action) => {
      state.currentLoginUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleCurrentLoaginUser} = TransactionSlice.actions;

export default TransactionSlice.reducer;
