import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import '../Login.css';
import { LoginState } from '../Login/Login';
import CustomButton from '../../components/Button/Button';
import { signinWithGoogle, signUp } from '../../firebase/firebase';

interface RegisterName extends LoginState {
  displayName: string;
}

const Register: React.FC = (props) => {
  const [formData, setFormData] = useState<RegisterName>({
    email: '',
    password: '',
    displayName: '',
  });
  const { email, password, displayName } = formData;

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
    try {
      await signUp({ email, password }, displayName);
    } catch (error) {
      throw new Error('Something went wrong')
    }
     

    // if (response.message) {
    //   // eslint-disable-next-line
    //   alert(response.message);
    //   setFormData({
    //     ...formData,
    //     email: '',
    //     password: '',
    //     displayName: '',
    //   });
    // }
  };

  const googleSignInHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await signinWithGoogle();
  };
  return (
    <div className='container'>
      <h1>SIGN UP</h1>
      <form>
        <TextInput
          type='name'
          value={displayName}
          placeholder='Name'
          name='displayName'
          onChange={handleChangeHandler}
        />
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
          <CustomButton onClickHandler={submitHandler} inverted>
            Signup
          </CustomButton>
          <CustomButton isGoogleSignIn onClickHandler={googleSignInHandler}>
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>
      </form>
      <p>
        Have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
