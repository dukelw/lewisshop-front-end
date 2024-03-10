import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ShopHeaderNoLogo.module.scss';
import ShopHeaderNoLogo from '../components/ShopHeaderNoLogo';

const cx = classNames.bind(styles);

function ShopHeaderOnly({ children }) {
  return (
    <div className={cx('container')}>
      <ShopHeaderNoLogo />
      <div className={cx('inner')}>{children}</div>
    </div>
  );
}

ShopHeaderOnly.propTyles = {
  children: PropTypes.node.isRequired,
};

export default ShopHeaderOnly;
