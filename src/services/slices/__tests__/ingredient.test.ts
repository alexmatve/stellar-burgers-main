import reducer, { fetchIngredients, initialState } from '../ingredient';
import { TIngredient } from '@utils-types';

describe('ingredients slice reducer', () => {
  const sampleItems: TIngredient[] = [
    {
      _id: '1',
      name: 'Tomato',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 3,
      calories: 15,
      price: 20,
      image: '',
      image_mobile: '',
      image_large: '',
    }
  ];

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: sampleItems };
    const state = reducer(initialState, action);
    
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(sampleItems);
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: { message: 'Ошибка' } };
    const state = reducer(initialState, action);
    
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Произошла ошибка');
  });
});
