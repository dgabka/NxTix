import React from 'react';
import cls from 'classnames';

import styles from './FormInput.module.scss';

interface Props {
  label: string;
  value: string;
  name: string;
  type: 'email' | 'password' | 'text';
  onChange: React.ChangeEventHandler;
  autoComplete?: string;
  required?: boolean;
}

const FormInput: React.FC<Props> = ({ label, value, ...inputProps }) => {
  return (
    <div className={styles.formGroup}>
      <label>
        <input className={styles.formInput} value={value} {...inputProps} />
        <span
          className={cls(styles.formLabel, { [styles.shrink]: value?.length })}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

export default FormInput;
