import builderReducer from '../../slices/builder';
import userReducer from '../../slices/user';
import ordersReducer from '../../slices/orders';
import ingredientsReducer from '../../slices/ingredient';
import feedReducer from '../../slices/feed';
import { rootReducer } from '../../store';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние всех слайсов', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      builder: builderReducer(undefined, { type: '@@INIT' }),
      user: userReducer(undefined, { type: '@@INIT' }),
      orders: ordersReducer(undefined, { type: '@@INIT' }),
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      feed: feedReducer(undefined, { type: '@@INIT' })
    });
  });
});
