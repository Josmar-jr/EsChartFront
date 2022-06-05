import { render, screen, cleanup } from '@testing-library/react';
import { Input } from '../../components/Form/Input';
import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

describe('Input Component', () => {
  it('should render correctly', () => {
    render(<Input name="email" />);

    const input = screen.getByLabelText('email');

    expect(input).toBeInTheDocument();
  });

  it('should show the toast and change input border color when to error', () => {
    const mockError = {
      message: 'email must be a valid email',
      type: 'email'
    };

    render(<Input name="email" error={mockError} />);

    const tooltipAlert = screen.getByRole('alert');
    const input = screen.getByLabelText('email');

    expect(tooltipAlert).toBeInTheDocument();
    expect(input).toHaveClass('border-red-600 focus:border-red-700');
  });

  it('should match snapshot input without prop error', () => {
    const tree = renderer.create(<Input name="email" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot input with prop error', () => {
    const mockError = {
      message: 'email must be a valid email',
      type: 'email'
    };
    const tree = renderer
      .create(<Input name="email" error={mockError} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
