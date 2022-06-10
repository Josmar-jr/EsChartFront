import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import renderer from 'react-test-renderer';

import { renderHook } from '@testing-library/react-hooks';

import Login from '../../pages/index';
import {
  AuthProvider,
  AuthProviderProps,
  useAuth
} from '../../contexts/AuthContext';

jest.mock('next/router');

afterEach(() => {
  cleanup();
});

describe('Login Page', () => {
  it('should render page correctly', () => {
    render(<Login />);

    const mainWrapper = screen.getByRole('main');

    expect(mainWrapper).toBeInTheDocument();
  });

  it('should display required error when value is invalid', async () => {
    render(<Login />);

    const button = screen.getByRole('button');
    fireEvent.submit(button);

    const alert = await screen.findAllByRole('alert');

    expect(alert).toHaveLength(2);
  });

  it('should display matching error when email is invalid', async () => {
    render(<Login />);

    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const inputPassword = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;

    fireEvent.input(inputEmail, {
      target: {
        value: 'test'
      }
    });

    fireEvent.input(inputPassword, {
      target: {
        value: '@Abc1234'
      }
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(inputEmail.value).toBe('test');
    expect(inputPassword.value).toMatch(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/i);
  });

  it('should display matching error when password is invalid', async () => {
    const wrapper = ({ children }: AuthProviderProps) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper
    });

    render(<Login />);

    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const inputPassword = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;

    fireEvent.input(inputEmail, {
      target: {
        value: 'john.doe@test.com'
      }
    });

    fireEvent.input(inputPassword, {
      target: {
        value: 'test'
      }
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(inputEmail.value).toBe('john.doe@test.com');
    expect(inputPassword.value).toBe('test');
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Login />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
