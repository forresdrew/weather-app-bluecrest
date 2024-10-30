import './IconButton.css';
import { FunctionComponent, ReactNode } from 'react';

type IconButtonProps = {
  onClick: () => Promise<void>;
  children: ReactNode;
};

// Reusable "Icon Button" component to which you could really just pass anything. Will render ReactNode child as content.
const IconButton: FunctionComponent<IconButtonProps> = ({ onClick, children }) => {
  return (
    <div className="icon-button clickable" onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
