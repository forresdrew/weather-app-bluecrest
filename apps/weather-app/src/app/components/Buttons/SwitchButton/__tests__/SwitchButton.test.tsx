import { render, waitFor } from '@testing-library/react';
import SwitchButton from '../SwitchButton';

describe('SwitchButton', () => {
  it('will render', async () => {
    const { getByTestId, queryByTestId } = render(
      <SwitchButton
        testId="switch-button"
        label="My Button"
        isActive={false}
        onClick={async () => {
          //intentionally left empty
        }}
      />
    );

    await waitFor(() => expect(queryByTestId('switch-button')).toBeTruthy());
    await waitFor(() => expect(getByTestId('switch-button-label').textContent).toEqual('My Button'));
  });
});
