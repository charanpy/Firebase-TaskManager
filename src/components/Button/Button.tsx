import React from 'react';
import './Button.css';

interface StyleButtonProps {
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  children:string;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<StyleButtonProps> = ({
  children,
  isGoogleSignIn,
  inverted,
  onClickHandler,
}) => (
  <button
    type='submit'
    className={`${inverted ? 'inverted' : ''}${
      isGoogleSignIn ? 'google-sign-in' : ''
    } button`}
    onClick={onClickHandler}
  >
    {children}
  </button>
);

export default Button;
