import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import ShopProductCard from '../ShopProductCard';
import styles from './ShopProductContainer.module.scss';

const cx = classNames.bind(styles);

function ShopProductContainer({ products = [], axiosJWT }) {
  const halfIndex = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, halfIndex);
  const secondHalf = products.slice(halfIndex);

  return (
    <Row>
      <Col md={6}>
        {firstHalf.map((product, index) => (
          <Link className={cx('link')} key={index} to={product._id}>
            <ShopProductCard axiosJWT={axiosJWT} product={product} />
          </Link>
        ))}
      </Col>
      <Col md={6}>
        {secondHalf.map((product, index) => (
          <Link className={cx('link')} key={index} to={product._id}>
            <ShopProductCard axiosJWT={axiosJWT} product={product} />
          </Link>
        ))}
      </Col>
    </Row>
  );
}

export default ShopProductContainer;
