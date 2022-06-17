import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: User,
  initialState: {
    displayName: 'nguyen van a',
    email: 'a@gmail.com',
    photoURL: 'photo',
    id: '123-1232',
  },
  reducers: {
    get: (state) => {
      return state;
    },
  },
});

export default userSlice;
