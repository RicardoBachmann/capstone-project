import {render, screen} from '@testing-library/react';

import ParticipantCard from './ParticipantCard.js';

describe('ParticipantCard', () => {
  it('should render the data when api responds', () => {
    render(<ParticipantCard />);
    const participantCard = screen.getByRole('article');
    expect(participantCard).toBeInTheDocument();
  });
});
