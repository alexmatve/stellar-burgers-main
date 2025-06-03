import reducer, { fetchFeeds, clearFeed, initialState } from '../feed';
import { TOrder } from '@utils-types';

describe('feed slice reducer', () => {
  const sampleOrders: TOrder[] = [
    {
      _id: 'order1',
      ingredients: ['id1', 'id2'],
      status: 'done',
      name: 'Order 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T01:00:00.000Z',
      number: 1
    }
  ];

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const payload = {
      orders: sampleOrders,
      total: 10,
      totalToday: 5
    };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(sampleOrders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it('should handle fetchFeeds.rejected', () => {
    const action = { type: fetchFeeds.rejected.type, payload: 'Ошибка загрузки' };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('should handle clearFeed reducer', () => {
    const startState = {
      orders: sampleOrders,
      total: 10,
      totalToday: 5,
      isLoading: true,
      error: 'Some error'
    };

    const action = clearFeed();
    const state = reducer(startState, action);

    expect(state).toEqual(initialState);
  });
});
