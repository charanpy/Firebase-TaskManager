import React from 'react';
import './TextInput.css';

const TextInput: React.FC<TextInputProps> = (props) => (
  <>
    <input {...props} className={props.popup ? 'input popup' : 'input'} autoComplete='off' />
  </>
);

interface TextInputProps {
  type: string;
  value: string;
  placeholder: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  popup?:number
  
}

export default TextInput;
