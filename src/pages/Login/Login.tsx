import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import CustomButton from '../../components/Button/Button';
import '../Login.css';
import { signIn, signinWithGoogle } from '../../firebase/firebase';

export interface LoginState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginState>({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn(email, password);
    setFormData({
      ...formData,
      email: '',
      password: '',
    });
  };

  const googleSignInHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await signinWithGoogle();
  };

  return (
    <div className='container'>
      <h1>SIGN IN</h1>
      <form>
        <TextInput
          type='email'
          value={email}
          placeholder='Email'
          name='email'
          onChange={handleChangeHandler}
        />
        <TextInput
          type='password'
          value={password}
          placeholder='Password'
          name='password'
          onChange={handleChangeHandler}
        />
        <div className='buttons'>
          <CustomButton onClickHandler={submitHandler}>Login</CustomButton>
          <CustomButton isGoogleSignIn onClickHandler={googleSignInHandler}>
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
