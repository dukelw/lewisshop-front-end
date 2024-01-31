import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ShopDefaultLayout.module.scss';

import ShopHeader from '../components/ShopHeader';

const cx = classNames.bind(styles);

function ShopDefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <ShopHeader></ShopHeader>
      <div className={cx('container')}>
        <div className={cx('inner')}>
          {/* <Sidebar></Sidebar> */}
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

ShopDefaultLayout.propTyles = {
  children: PropTypes.node.isRequired,
};

export default ShopDefaultLayout;
