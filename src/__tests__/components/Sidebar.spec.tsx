import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Sidebar } from '../../components/Sidebar';

afterEach(() => {
  cleanup();
});

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/test'
      };
    }
  };
});

describe('Input Component', () => {
  it('should render correctly', () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole('menubar');

    expect(sidebar).toBeInTheDocument();
  });

  it('should start expand the sidebar', () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole('menubar');
    const button = screen.getByRole('button');

    expect(sidebar).toHaveClass('w-48');
    expect(sidebar).not.toHaveClass('w-12');
    expect(button).toHaveClass('rotate-180');
  });

  it('should compress the sidebar when clicking the button ', () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole('menubar');
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(sidebar).not.toHaveClass('w-48');
    expect(sidebar).toHaveClass('w-12');
    expect(button).toHaveClass('translate-x-[-124px]');
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Sidebar />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
