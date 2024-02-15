import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
  const handleProductDetail = (productID, shopID, productType) => {
    localStorage.setItem('productDetailID', productID);
    localStorage.setItem('productShopID', shopID);
    localStorage.setItem('productType', productType);
  };
  return (
    <div onClick={() => handleProductDetail(data._id, data.product_shop, data.product_type)}>
      <Link to={`/product/${data.product_slug}`} className={cx('wrapper')}>
        <Image src={data.product_thumb} alt={`${data.product_name}`} className={cx('avatar')} />
        <div className={cx('info')}>
          <h4 className={cx('name')}>
            <span>{`${data.product_name}`}</span>
            {/* {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}></FontAwesomeIcon>} */}
          </h4>
          <span className={cx('username')}>{data.product_description}</span>
        </div>
      </Link>
    </div>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductItem;
