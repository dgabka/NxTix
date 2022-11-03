import cls from 'classnames';
import { MouseEventHandler } from 'react';

import styles from './Button.module.scss';

const buttonStyles = {
  google: 'googleButton',
  inverted: 'invertedButton',
  default: 'defaultButton',
} as const;

type buttonStyles = keyof typeof buttonStyles;

interface Props {
  children: React.ReactNode;
  buttonStyle?: buttonStyles;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button';
  isLoading?: boolean;
}

const getButtonClasses = (buttonStyle: buttonStyles) =>
  cls(styles.commonButton, styles[buttonStyles[buttonStyle]]);

const Button: React.FC<Props> = ({
  children,
  buttonStyle = 'default',
  isLoading = false,
  ...buttonProps
}) => {
  return (
    <button
      disabled={isLoading}
      className={getButtonClasses(buttonStyle)}
      {...buttonProps}
    >
      {isLoading ? <div /> : children}
    </button>
  );
};

export default Button;
