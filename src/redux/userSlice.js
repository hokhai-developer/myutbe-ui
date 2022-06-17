import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
    logoutUser: () => {
      return {};
    },
  },
});

export default userSlice;
