import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebhookSchema } from 'frontend/src/schema/webhookSchema';

const initialState: WebhookSchema[] = [];

const webhookSlice = createSlice({
  name: 'webhook',
  initialState,
  reducers: {
    addWebhook: (state, action: PayloadAction<WebhookSchema>) => {
      state.push(action.payload);
    },
    updateWebhook: (state, action: PayloadAction<WebhookSchema>) => {
      const index = state.findIndex(webhook => webhook.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeWebhook: (state, action: PayloadAction<string>) => {
      return state.filter(webhook => webhook.id !== action.payload);
    },
  },
});

export const { addWebhook, updateWebhook, removeWebhook } = webhookSlice.actions;
export default webhookSlice.reducer;