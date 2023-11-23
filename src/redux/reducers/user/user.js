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
      countryCode: 'CA',
      balance: 0.0,
      sign: '$',
    },
    {
      id: 1,
      name: 'Digital hong kong dollar',
      nickName: 'DHKD',
      countryCode: 'HK',
      balance: 0,
      sign: '$',
    },
    {
      id: 2,
      name: 'Digital american dollar',
      nickName: 'DUSD',
      countryCode: 'us',
      balance: 0.0,
      sign: '$',
    },
    {
      id: 3,
      name: 'Digital Barbados dollar',
      nickName: 'DBBD',
      countryCode: 'bb',
      balance: 0.0,
      sign: '$',
    },
    {
      id: 4,
      name: 'Digital Bahamas dollar',
      nickName: 'DBSD',
      countryCode: 'bs',
      balance: 0.0,
      sign: '$',
    },
    {
      id: 5,
      name: 'Digital Aroba dollar',
      nickName: 'DBWD',
      countryCode: 'aw',
      balance: 0.0,
      sign: '$',
    },
  ],
  selectedCountry: '',
  response1: null,

  isKYCVerified: 0,
  KYCStatusText: '',
  KYCStatusIcon: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleCurrentLoaginUser: (state, action) => {
      state.currentLoginUser = action.payload;

      state.isKYCVerified = action.payload?.data?.isKYCVerified;

      if (action.payload?.data?.isKYCVerified == 0) {
        state.KYCStatusText = 'Not verified';
        state.KYCStatusIcon = 'alert-rhombus-outline';
      } else if (action.payload?.data?.isKYCVerified == 1) {
        state.KYCStatusText = 'Pending';
        state.KYCStatusIcon = 'alert-decagram-outline';
      } else if (action.payload?.data?.isKYCVerified == 2) {
        state.KYCStatusText = 'Verification failed';
        state.KYCStatusIcon = 'account-cancel';
      } else if (action.payload?.data?.isKYCVerified == 3) {
        state.KYCStatusText = 'Declined';
        state.KYCStatusIcon = 'cancel';
      } else if (action.payload?.data?.isKYCVerified == 4) {
        state.KYCStatusText = 'Verified';
        state.KYCStatusIcon = 'check';
      } else {
        state.KYCStatusText = 'Not verified';
        state.KYCStatusIcon = 'alert-rhombus-outline';
      }
    },
    handlePasswordResetSuccessfully: (state, action) => {
      state.passwordResetSuccessflly = action.payload;
    },
    handleSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    handleResponse1: (state, action) => {
      state.response1 = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleCurrentLoaginUser,
  handlePasswordResetSuccessfully,
  handleSelectedCountry,
  handleResponse1,
} = UserSlice.actions;

export default UserSlice.reducer;
