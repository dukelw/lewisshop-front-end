import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HeaderAndFooter.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function HeaderAndFooter({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header></Header>
      <div className={cx('container')}>
        <div className={cx('inner')}>
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

HeaderAndFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderAndFooter;
