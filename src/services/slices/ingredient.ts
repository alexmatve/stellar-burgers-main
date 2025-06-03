import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api'; 

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

// Начальное состояние
export const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null
};


export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => await getIngredientsApi()
);

// ingredientsSlice
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Произошла ошибка';
      });
  }
});

export default ingredientsSlice.reducer;
