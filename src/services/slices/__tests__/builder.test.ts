import builderReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState
} from '../builder';

import { TIngredient } from '@utils-types';

// Мокаем uuidv4 чтобы всегда возвращал одинаковый id
jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('builder slice reducer', () => {
  const sampleIngredient: TIngredient = {
    _id: 'ingredient-1',
    name: 'Cheese',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 5,
    price: 10,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('should handle addIngredient action', () => {
    const action = addIngredient(sampleIngredient);
    const state = builderReducer(initialState, action);

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual({
      ...sampleIngredient,
      id: 'test-uuid'
    });
  });

  it('should handle removeIngredient action', () => {
    // Начинаем с состоянием, где один ингредиент есть
    const startState = {
      ...initialState,
      ingredients: [{ ...sampleIngredient, id: 'test-uuid' }]
    };

    const action = removeIngredient('test-uuid');
    const state = builderReducer(startState, action);

    expect(state.ingredients.length).toBe(0);
  });

  it('should handle moveIngredient action - move up', () => {
    const startState = {
      ...initialState,
      ingredients: [
        { ...sampleIngredient, id: 'id1', name: 'Cheese' },
        { ...sampleIngredient, id: 'id2', name: 'Tomato' }
      ]
    };

    const action = moveIngredient({ index: 1, upwards: true });
    const state = builderReducer(startState, action);

    expect(state.ingredients[0].id).toBe('id2');
    expect(state.ingredients[1].id).toBe('id1');
  });

  it('should handle moveIngredient action - move down', () => {
    const startState = {
      ...initialState,
      ingredients: [
        { ...sampleIngredient, id: 'id1', name: 'Cheese' },
        { ...sampleIngredient, id: 'id2', name: 'Tomato' }
      ]
    };

    const action = moveIngredient({ index: 0, upwards: false });
    const state = builderReducer(startState, action);

    expect(state.ingredients[0].id).toBe('id2');
    expect(state.ingredients[1].id).toBe('id1');
  });
});
