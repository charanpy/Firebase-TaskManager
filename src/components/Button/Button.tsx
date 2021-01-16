import React from 'react';
import './Button.css';

interface StyleButtonProps {
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  children:string;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  style?:{};
}

const Button: React.FC<StyleButtonProps> = ({
  children,
  isGoogleSignIn,
  inverted,
  onClickHandler,
  style={},
}) => (
  <button
    type='submit'
    className={`${inverted ? 'inverted' : ''}${
      isGoogleSignIn ? 'google-sign-in' : ''
    } button`}
    style={style && style}
    onClick={onClickHandler}
  >
    {children}
  </button>
);

export default Button;
