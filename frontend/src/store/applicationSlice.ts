import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationSchema } from 'frontend/src/schema/applicationSchema';

const initialState: ApplicationSchema[] = [];

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    addApplication: (state, action: PayloadAction<ApplicationSchema>) => {
      state.push(action.payload);
    },
    updateApplication: (state, action: PayloadAction<ApplicationSchema>) => {
      const index = state.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeApplication: (state, action: PayloadAction<string>) => {
      return state.filter(app => app.id !== action.payload);
    },
  },
});

export const { addApplication, updateApplication, removeApplication } = applicationSlice.actions;
export default applicationSlice.reducer;