import classNames from 'classnames/bind';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import styles from './ProductDetail.module.scss';
import QuantitySelect from '../QuantitySelect';
import Button from '../Button';
import { FavouriteIcon } from '../Icons';
import DropdownSelect from '../DropdownSelect';

const cx = classNames.bind(styles);

function ProductDetail({ product, recentProducts, relatedProducts }) {
  const [largeImage, setLargeImage] = useState(product.img);
  const [display, setDisplay] = useState('detail');
  return (
    <div className={cx('wrapper')}>
      {/* Product section */}
      <div className={cx('product')}>
        <div className={cx('left')}>
          <div className={cx('large-img', 'img')} style={{ backgroundImage: `url(${largeImage})` }}></div>
          <div className={cx('small-imgs')}>
            {product.imgs.map((img, index) => {
              return (
                <div
                  onClick={(e) => setLargeImage(img)}
                  key={index}
                  className={cx('small-img', 'img')}
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
              );
            })}
            {/* Where place more btn */}
          </div>
        </div>
        <div className={cx('right')}>
          <h2 className={cx('name')}>{product.name}</h2>
          <h3 className={cx('price')}>{product.new_price}</h3>
          <p className={cx('description')}>{product.description}</p>

          <div className={cx('variance')}>
            <DropdownSelect choices={['S', 'M', 'L', 'XL', 'XXL']} name={'sizes'}></DropdownSelect>
            <DropdownSelect choices={['Black', 'White', 'Grey', 'Green', 'Blue']} name={'colors'}></DropdownSelect>
          </div>

          <div className={cx('actions')}>
            <QuantitySelect outline large className={cx('action')}></QuantitySelect>
            <Button className={cx('action', 'add')} large primary>
              Add to cart
            </Button>
            <Button className={cx('action', 'favourite')} square outline>
              <FavouriteIcon></FavouriteIcon>
            </Button>
          </div>

          <ul className={cx('assurance')}>
            <li className={cx('square')}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li className={cx('square')}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li className={cx('square')}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          </ul>
        </div>
      </div>
      <Link to={product.shop_id}>
        <div className={cx('shop')}>
          <p className={cx('invite')}>Go to the shop for more products</p>
          <div className={cx('shop-avt')} style={{ backgroundImage: `url('${product.shop_img}')` }}></div>
          <div className={cx('shop-info')}>
            <p className={cx('shop-name')}>{product.shop_name}</p>
            <p className={cx('shop-status')}>{product.shop_status}</p>
          </div>
        </div>
      </Link>
      <div className={cx('section')}>
        <p className={cx('detail', 'text')} onClick={(e) => setDisplay('detail')}>
          Detail
        </p>
        <p className={cx('comment', 'text')} onClick={(e) => setDisplay('comment')}>
          Comment
        </p>
      </div>
      <div className={cx('relate')}>
        <p className={cx('title')}>Relate Products</p>
        <Container>
          <Row>
            {relatedProducts.map((item, index) => {
              return (
                <Col key={index} sm={6} xl={2} lg={2}>
                  <ProductCard data={item}></ProductCard>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div className={cx('recent')}>
        <p className={cx('title')}>Recently Viewed Products</p>
        <Container>
          <Row>
            {relatedProducts.map((item, index) => {
              return (
                <Col key={index} sm={6} xl={2} lg={2}>
                  <ProductCard data={item}></ProductCard>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProductDetail;
