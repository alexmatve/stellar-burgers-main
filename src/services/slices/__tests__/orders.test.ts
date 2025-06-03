import reducer, {
  fetchOrder,
  fetchOrders,
  createOrder,
  resetOrderModalData,
  initialState
} from '../orders';

import { TOrder } from '@utils-types';

describe('orders slice reducer', () => {
  const sampleOrder: TOrder = {
    _id: 'order1',
    ingredients: ['id1', 'id2'],
    status: 'done',
    name: 'Sample Order',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T01:00:00.000Z',
    number: 1
  };

  const sampleOrders: TOrder[] = [sampleOrder];

  // fetchOrder
  it('should handle fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.isOrderLoading).toBe(true);
  });

  it('should handle fetchOrder.fulfilled', () => {
    const action = { type: fetchOrder.fulfilled.type, payload: sampleOrder };
    const state = reducer(initialState, action);
    expect(state.isOrderLoading).toBe(false);
    expect(state.orderModalData).toEqual(sampleOrder);
  });

  it('should handle fetchOrder.rejected', () => {
    const action = { type: fetchOrder.rejected.type };
    const state = reducer(initialState, action);
    expect(state.isOrderLoading).toBe(false);
  });

  // fetchOrders
  it('should handle fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state.isOrdersLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrders.fulfilled', () => {
    const action = { type: fetchOrders.fulfilled.type, payload: sampleOrders };
    const state = reducer(initialState, action);
    expect(state.isOrdersLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.data).toEqual(sampleOrders);
  });

  it('should handle fetchOrders.rejected', () => {
    const error = { message: 'Fetch failed' };
    const action = { type: fetchOrders.rejected.type, error };
    const state = reducer(initialState, action);
    expect(state.isOrdersLoading).toBe(false);
    expect(state.error).toEqual(error);
  });

  // createOrder
  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: sampleOrder, name: 'Sample' }
    };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(sampleOrder);
  });

  it('should handle createOrder.rejected', () => {
    const action = { type: createOrder.rejected.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
  });

  // resetOrderModalData
  it('should handle resetOrderModalData', () => {
    const startState = {
      ...initialState,
      orderModalData: sampleOrder
    };
    const action = resetOrderModalData();
    const state = reducer(startState, action);
    expect(state.orderModalData).toBeNull();
  });
});
