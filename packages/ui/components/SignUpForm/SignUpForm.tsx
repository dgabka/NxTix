import React, { useState } from 'react';

import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './SignUpForm.module.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmedPassword } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  return (
    <div>
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form className={styles.signUpForm} onSubmit={() => {}}>
        <FormInput
          label="Display name"
          name="displayName"
          value={displayName}
          type="text"
          required
          autoComplete="name"
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          value={email}
          type="email"
          required
          autoComplete="username"
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name="password"
          value={password}
          type="password"
          required
          autoComplete="new-password"
          onChange={handleChange}
        />

        <FormInput
          label="Confirm password"
          name="confirmedPassword"
          value={confirmedPassword}
          type="password"
          required
          autoComplete="new-password"
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
