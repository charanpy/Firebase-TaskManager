import React from 'react';
import './TextInput.css';

const TextInput: React.FC<TextInputProps> = (props) => (
  <>
    <input {...props} />
  </>
);

interface TextInputProps {
  type: string;
  value: string;
  placeholder: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  
}

export default TextInput;
