import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import NoLogo from '../components/NoLogo';
import styles from './HeaderNoLogo.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
  return (
    <div className={cx('container')}>
      <NoLogo />
      <div className={cx('inner')}>{children}</div>
    </div>
  );
}

HeaderOnly.propTyles = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly;
