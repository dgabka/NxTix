import React from 'react';

import SignInForm from '../components/SignInForm/SignInForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';

const Auth = () => {
  return (
    <div>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Auth;
