// SignUp.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';
import authReducer, { signUpRequest, signUpSuccess, signUpFailure } from '../../redux/slices/authSlice';

const mockStore = createStore(authReducer);

describe('SignUp Page', () => {
  const mockSetEmail = jest.fn();
  const mockSetName = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetRepeatPass = jest.fn();
  const mockHandleSignUp = jest.fn();

  const initialProps = {
    email: '',
    name: '',
    password: '',
    repeatPass: '',
    handleSignUp: mockHandleSignUp,
    setEmail: mockSetEmail,
    setName: mockSetName,
    setPassword: mockSetPassword,
    setRepeatPass: mockSetRepeatPass,
    error: null,
    auth: { loading: false, error: null },
  };

  const renderComponent = (store: any) =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp {...initialProps} />
        </BrowserRouter>
      </Provider>
    );

  test('renders all input fields', () => {
    renderComponent(mockStore);

    expect(screen.getByPlaceholderText('...ایمیل خود را وارد کنید')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('...نام  خود را وارد کنید')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('...رمز عبور خود را وارد کنید')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('...رمز عبور خود را دوباره وارد کنید')).toBeInTheDocument();
  });

  test('calls setEmail when email input is changed', () => {
    renderComponent(mockStore);

    fireEvent.change(screen.getByPlaceholderText('...ایمیل خود را وارد کنید'), {
      target: { value: 'test@example.com' },
    });

    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  test('displays error message when error is passed as a prop', () => {
    const errorProps = {
      ...initialProps,
      error: 'Signup failed',
    };

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SignUp {...errorProps} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Signup failed')).toBeInTheDocument();
  });

  test('calls handleSignUp when signup button is clicked', () => {
    renderComponent(mockStore);

    fireEvent.click(screen.getByText('ثبت نام'));

    expect(mockHandleSignUp).toHaveBeenCalled();
  });
});
