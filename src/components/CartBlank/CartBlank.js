import classNames from 'classnames/bind';
import styles from './CartBlank.module.scss';
import { CartBlankIcon } from '../Icons';

const cx = classNames.bind(styles);

function CartBlank() {
  return (
    <div className={cx('wrapper')}>
      <CartBlankIcon width="12rem" height="12rem" />
      <p className={cx('noti')}>There is no product in your cart!</p>
    </div>
  );
}

export default CartBlank;
