import React, { useState } from 'react';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

import styles from './SignInForm.module.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Already have an account?</h2>
      <span id={styles.subtitle}>Sign in with your email and password</span>
      <form className={styles.signInForm} onSubmit={() => {}}>
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
          autoComplete="current-password"
          onChange={handleChange}
        />
        <div className={styles.buttonsContainer}>
          <Button type="submit">Sign In</Button>
          <Button type="submit" buttonStyle="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
