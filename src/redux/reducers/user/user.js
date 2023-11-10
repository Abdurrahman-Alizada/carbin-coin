import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  success: false,
  loading: false,
  currentLoginUser: {},
  users: [],
  passwordResetSuccessflly: false,
  curr: [
    {
      id: 0,
      name: 'Digital candian dollar',
      nickName: 'DCAD',
      countryCode:"ca",
      balance: 98.01,
      sign: '$',
    },
    {
      id: 1,
      name: 'Digital hong kong dollar',
      nickName: 'DHKD',
      countryCode:"HK",
      balance: 80.01,
      sign: '$',
    },
    {
      id: 2,
      name: 'Digital american dollar',
      nickName: 'DUSD',
      countryCode:"us",
      balance: 23,
      sign: '$',
    },
    {
      id: 3,
      name: 'Digital Barbados dollar',
      nickName: 'DBBD',
      countryCode:"bb",
      balance: 56,
      sign: '$',
    },
    {
      id: 4,
      name: 'Digital Bahamas dollar',
      nickName: 'DBSD',
      countryCode:"bs",
      balance: 20,
      sign: '$',
    },
    {
      id: 5,
      name: 'Digital Aroba dollar',
      nickName: 'DBWD',
      countryCode:"aw",
      balance: 60,
      sign: '$',
    },
  ],
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleCurrentLoaginUser: (state, action) => {
      state.currentLoginUser = action.payload;
    },
    handlePasswordResetSuccessfully: (state, action) => {
      state.passwordResetSuccessflly = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleCurrentLoaginUser, handlePasswordResetSuccessfully} =
  UserSlice.actions;

export default UserSlice.reducer;
