import './IconButton.css';
import { FunctionComponent, ReactNode } from 'react';

type IconButtonProps = {
  onClick: () => Promise<void>;
  children: ReactNode;
  testId?: string;
};

// Reusable "Icon Button" component to which you could really just pass anything. Will render ReactNode child as content.
const IconButton: FunctionComponent<IconButtonProps> = ({ onClick, children, testId }) => {
  return (
    <div data-testid={testId} className="icon-button clickable" onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
