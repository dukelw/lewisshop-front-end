import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ShopItem.module.scss';
import Image from '../Image';
import { createSlug } from '~/utils/slugCreator';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
  const handleProductDetail = (shopID) => {
    localStorage.setItem('productShopID', shopID);
    localStorage.setItem('shopID', shopID);
  };
  return (
    <div onClick={() => handleProductDetail(data?._id)}>
      <Link to={`/shop/${createSlug(data.name)}`} className={cx('wrapper')}>
        <Image src={data.thumb} alt={`${data.name}`} className={cx('avatar')} />
        <div className={cx('info')}>
          <h4 className={cx('name')}>
            <span>{`${data.name}`}</span>
          </h4>
          <span className={cx('username')}>{data.description}</span>
        </div>
      </Link>
    </div>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductItem;
