import Image from 'next/image';
import styles from './CartIcon.module.scss';

import cartIcon from '../../public/static/cart.svg';

const CartIcon = () => {
  return (
    <div className={styles.cartIconContainer}>
      <Image src={cartIcon} alt="cart" className={styles.cartIcon} />
      <span className={styles.itemCount}>123</span>
    </div>
  );
};

export default CartIcon;
