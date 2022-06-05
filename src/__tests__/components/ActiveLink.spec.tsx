import { render, screen, cleanup } from '@testing-library/react';
import { ActiveLink } from '../../components/ActiveLink';
import renderer from 'react-test-renderer';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/dashboard'
      };
    }
  };
});

describe('Sidebar Component', () => {
  it('should render correctly', () => {
    render(
      <ActiveLink href="/dashboard">
        <a>Dashboard</a>
      </ActiveLink>
    );

    const link = screen.getByText('Dashboard');

    expect(link).toBeInTheDocument();
  });

  it('should add class if the link is currently active', () => {
    render(
      <ActiveLink href="/dashboard">
        <a>Dashboard</a>
      </ActiveLink>
    );

    const link = screen.getByText('Dashboard');

    expect(link).toHaveClass('text-primary after:bg-primary');
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <ActiveLink href="/dashboard">
          <a>Dashboard</a>
        </ActiveLink>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
