import React from 'react';
import Link from 'next/link';
import { Baumans } from '@next/font/google';
import cls from 'classnames';

import CartIcon from '../CartIcon/CartIcon';
import UserIcon from '../UserIcon/UserIcon';

import styles from './Header.module.scss';

const baumans = Baumans({
  weight: '400',
  subsets: ['latin'],
});

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Link href={'/'}>
        <span className={cls(styles.logo, baumans.className)}>NXT</span>
      </Link>
      <div className={styles.headerIcons}>
        <div className={styles.headerIconWrapper}>
          <UserIcon />
        </div>

        <div className={styles.headerIconWrapper}>
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
