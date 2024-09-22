import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { loginRequest } from '../../redux/slices/authSlice';

const mockStore = configureStore([]);

describe('Login Component', () => {
  it('should render login form', () => {
    const store = mockStore({
      auth: { loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <Login email="" password="" handleLogin={() => { }} setEmail={() => { }} setPassword={() => { }} error={null} auth={{ loading: false, error: null }} />
      </Provider>
    );

    expect(screen.getByLabelText(/ایمیل/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/رمز عبور/i)).toBeInTheDocument();
  });

  it('should dispatch loginRequest when login button is clicked', () => {
    const store = mockStore({
      auth: { loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <Login email="test@test.com" password="123456" handleLogin={() => { }} setEmail={() => { }} setPassword={() => { }} error={null} auth={{ loading: false, error: null }} />
      </Provider>
    );

    fireEvent.click(screen.getByText('ورود'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(loginRequest({ email: 'test@test.com', password: '123456' }));
  });
});
