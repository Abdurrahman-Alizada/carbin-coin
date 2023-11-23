import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en',
  cardNumber : "1234 2893 3245 4567",

};

export const SettingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    handleCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    handleCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleCurrentLanguage, handleCardNumber} = SettingSlice.actions;

export default SettingSlice.reducer;
