import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  token: null,
  username: null,
  email: null,
  role: null,
  id: null,
};
// const storage = localStorage.getItem('user')
//   ? localStorage.getItem('user')
//   : initialState;
// console.log(storage);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredential: (state, action) => {
      const {
        access_token,
        user: { username, email, role, id },
      } = action.payload;

      console.log(action.payload);
      state.token = access_token;
      state.username = username;
      state.email = email;
      state.role = role;
      state.id = id;
      // localStorage.setItem('user', state);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.email = null;
      state.role = null;
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, setCredential } = userSlice.actions;

export default userSlice.reducer;
