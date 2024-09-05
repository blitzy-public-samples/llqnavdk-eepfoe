import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from 'frontend/src/schema/userSchema';

const initialState: UserSchema[] = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserSchema>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<UserSchema>) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;