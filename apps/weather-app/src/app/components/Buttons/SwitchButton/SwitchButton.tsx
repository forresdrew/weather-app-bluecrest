import './SwitchButton.css';
import { FunctionComponent } from 'react';

type SwitchButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId?: string;
};

// Reusable switch button with dynamic styling depending on isActive prop
const SwitchButton: FunctionComponent<SwitchButtonProps> = ({ label, isActive, onClick, testId }) => {
  const activeStyle = `switch-button-${isActive ? 'enabled' : 'disabled'}`;
  return (
    <div data-testid={testId} onClick={onClick} className={`switch-button-container clickable ${activeStyle}`}>
      <p data-testid={`${testId}-label`}>{label}</p>
    </div>
  );
};

export default SwitchButton;
