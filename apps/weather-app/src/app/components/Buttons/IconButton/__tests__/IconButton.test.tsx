import { render, waitFor } from '@testing-library/react';
import IconButton from '../IconButton';

describe('IconButton', () => {
  it('will render', async () => {
    const { queryByTestId } = render(
      <IconButton
        testId="icon-button"
        onClick={async () => {
          // intentionally left empty
        }}
      >
        <></>
      </IconButton>
    );

    await waitFor(() => expect(queryByTestId('icon-button')).toBeTruthy());
  });
});
