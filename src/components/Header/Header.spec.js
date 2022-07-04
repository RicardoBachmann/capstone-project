import {render, screen} from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('should render the header with project-title', () => {
    render(<Header />);
    const projectTitle = screen.getByText(/Surveillance/);
    expect(projectTitle).toBeInTheDocument();
  });
});
