import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import ShopProductCard from '../ShopProductCard';
import styles from './ShopProductContainer.module.scss';

const cx = classNames.bind(styles);

function ShopProductContainer({ products = [], axiosJWT, part, publishEnable }) {
  const halfIndex = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, halfIndex);
  const secondHalf = products.slice(halfIndex);

  return (
    <Row className={cx('row')}>
      <h1 className={cx('part')}>{part}</h1>
      <Col className={cx('col-left')} md={6}>
        {firstHalf.map((product, index) => (
          <Link className={cx('link')} key={index} to={product._id}>
            <ShopProductCard axiosJWT={axiosJWT} product={product} publishEnable={publishEnable}/>
          </Link>
        ))}
      </Col>
      <Col className={cx('col-right')} md={6}>
        {secondHalf.map((product, index) => (
          <Link className={cx('link')} key={index} to={product._id}>
            <ShopProductCard axiosJWT={axiosJWT} product={product} publishEnable={publishEnable}/>
          </Link>
        ))}
      </Col>
    </Row>
  );
}

export default ShopProductContainer;
