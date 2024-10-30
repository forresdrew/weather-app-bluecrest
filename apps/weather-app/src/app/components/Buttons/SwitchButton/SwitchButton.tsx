import './SwitchButton.css';
import { FunctionComponent, ReactNode } from 'react';

type SwitchButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

// Reusable switch button with dynamic styling depending on isActive prop
const SwitchButton: FunctionComponent<SwitchButtonProps> = ({ label, isActive, onClick }) => {
  const activeStyle = `switch-button-${isActive ? 'enabled' : 'disabled'}`;
  return (
    <div onClick={onClick} className={`switch-button-container clickable ${activeStyle}`}>
      <p>{label}</p>
    </div>
  );
};

export default SwitchButton;
