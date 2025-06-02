// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TConstructorIngredient } from '@utils-types';

// type ConstructorState = {
//   bun: TConstructorIngredient | null;
//   ingredients: TConstructorIngredient[];
// };

// const initialState: ConstructorState = {
//   bun: null,
//   ingredients: [],
// };

// const constructor = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     setBun(state, action: PayloadAction<TConstructorIngredient>) {
//       state.bun = action.payload;
//     },
//     addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
//       state.ingredients.push(action.payload);
//     },
//     removeIngredient(state, action: PayloadAction<string>) {
//       state.ingredients = state.ingredients.filter(i => i.id !== action.payload);
//     },
//     clearConstructor(state) {
//       state.bun = null;
//       state.ingredients = [];
//     },
//   },

//   selectors: {
//         selectBun: (sliceState) => {
//             return sliceState.bun
//         },
//         selectIngredients: (sliceState) => {
//             return sliceState.ingredients
//         },
//     },
// });

// export const { selectBun, selectIngredients } = constructor.selectors

// export const {
//   setBun,
//   addIngredient,
//   removeIngredient,
//   clearConstructor,
// } = constructor.actions;

// export default constructor.reducer;
