import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '../../../utils/burger-api'; // ты можешь адаптировать путь
import { RootState } from '../../store/index';

type TOrdersState = {
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: null | SerializedError;
  data: TOrder[];
};

export const initialState: TOrdersState = {
  isOrderLoading: true,
  isOrdersLoading: true,
  orderRequest: false,
  orderModalData: null,
  error: null,
  data: []
};

// Асинхронный thunk для отправки заказа
export const createOrder = createAsyncThunk<
   {
    order: TOrder;
    name: string;
  },
  string[]
>(
  'orders/createOrder',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients); // должен вернуть { order: TOrder }
      return { order: response.order, name: response.name };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при создании заказа');
    }
  }
);

export const fetchOrder = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.orders[0];
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

export const { resetOrderModalData } = ordersSlice.actions;
export default ordersSlice.reducer;
