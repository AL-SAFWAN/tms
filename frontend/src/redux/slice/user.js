import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state from local storage:', e);
    return undefined;
  }
};

const initialState = loadFromLocalStorage() || {
  token: null,
  username: null,
  email: null,
  role: null,
  id: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredential: (state, action) => {
      const {
        access_token,
        user: { username, email, role, id },
      } = action.payload;

      state.token = access_token;
      state.username = username;
      state.email = email;
      state.role = role;
      state.id = id;
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
