import reducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  initialState
} from '../user';

import { TUser } from '@utils-types';

describe('user slice reducer', () => {
  const sampleUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  // reducers tests
  it('should handle loginStart', () => {
    const state = reducer(initialState, loginStart());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should handle loginSuccess', () => {
    const state = reducer(initialState, loginSuccess(sampleUser));
    expect(state.user).toEqual(sampleUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should handle loginFailure', () => {
    const error = 'Error message';
    const state = reducer(initialState, loginFailure(error));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle logout', () => {
    const loggedInState = {
      ...initialState,
      user: sampleUser,
      isAuthenticated: true
    };
    const state = reducer(loggedInState, logout());
    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.isAuthenticated).toBe(false);
  });

  it('should handle setUser', () => {
    const state = reducer(initialState, setUser(sampleUser));
    expect(state.user).toEqual(sampleUser);
  });

  // asyncThunk tests

  // registerUser
  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should handle registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: sampleUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(sampleUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should handle registerUser.rejected', () => {
    const action = { type: registerUser.rejected.type, payload: 'Failed to register' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to register');
  });

  // loginUser
  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    // According to your slice, error is set to 'undefined' string on loginUser.pending
    expect(state.error).toBe('undefined');
  });

  it('should handle loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: sampleUser };
    const state = reducer(initialState, action);
    expect(state.error).toBe('undefined');
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(sampleUser);
  });

  it('should handle loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка при аутентификации');
  });

  // logoutUser
  it('should handle logoutUser.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user: sampleUser,
      isAuthenticated: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(loggedInState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toEqual({ email: '', name: '' });
  });

  // fetchUser
  it('should handle fetchUser.fulfilled', () => {
    const action = { type: fetchUser.fulfilled.type, payload: sampleUser };
    const state = reducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(sampleUser);
  });

  // updateUser
  it('should handle updateUser.fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: sampleUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(sampleUser);
  });
});
