import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface OrderState {
  paymentData: any;
}

const initialState: OrderState = {
  paymentData: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<any>) => {
      state.paymentData = action.payload;
    },
    clearOrder: (state) => {
      state.paymentData = null;
    },
  },
});

export const { setPaymentData, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const usePaymentData = (state: RootState) => state.order.paymentData;
