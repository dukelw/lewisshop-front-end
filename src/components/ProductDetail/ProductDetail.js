import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import styles from './ProductDetail.module.scss';
import QuantitySelect from '../QuantitySelect';
import Button from '../Button';
import { FavouriteIcon } from '../Icons';
import axios from 'axios';
import DropdownSelect from '../DropdownSelect';
import { findProductByID, findRelateProduct, findShopByID } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductDetail() {
  const productID = localStorage.getItem('productDetailID');
  const shopID = localStorage.getItem('productShopID');
  const productType = localStorage.getItem('productType');
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state?.products.product.foundProduct);
  const relate = useSelector((state) => state?.products.relateProduct.relatedProducts);
  const originalRecentProducts = useSelector((state) => state?.products.recentProduct.recentProducts);
  const relatedProducts = relate?.metadata;
  const productShop = useSelector((state) => state?.shop.shop.foundShop);
  const shop = productShop?.metadata;
  const product = currentProduct?.metadata;
  const [display, setDisplay] = useState('detail');
  const recentProducts = originalRecentProducts.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => t.metadata._id === value.metadata._id, // check duplicates by _id
      ),
  );

  useEffect(() => {
    // Use axios because this function can be used even if user has not signed in
    findProductByID(productID, dispatch, axios);
    findShopByID(shopID, dispatch, axios);
    findRelateProduct(productType, dispatch, axios);
  }, []);

  return (
    <div className={cx('wrapper')}>
      {/* Product section */}
      <div className={cx('product')}>
        <div className={cx('left')}>
          <div className={cx('img')} style={{ backgroundImage: `url(${product?.product_thumb})` }}></div>
        </div>
        <div className={cx('right')}>
          <h2 className={cx('name')}>{product?.product_name}</h2>
          <h3 className={cx('price')}>{product?.product_price}</h3>
          <p className={cx('description')}>{product?.product_description}</p>

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
            {product?.product_attributes &&
              Object.entries(product?.product_attributes).map(([key, value]) => (
                <li className={cx('square')} key={key}>
                  <span>{key.toUpperCase()}: </span>
                  <span>{value}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Link to={shop?._id}>
        <div className={cx('shop')}>
          <p className={cx('invite')}>Go to the shop for more products</p>
          <div className={cx('shop-avt')} style={{ backgroundImage: `url('${shop?.thumb}')` }}></div>
          <div className={cx('shop-info')}>
            <p className={cx('shop-name')}>{shop?.name}</p>
            <p className={cx('shop-status')}>{shop?.status}</p>
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
            {relatedProducts &&
              relatedProducts.map((item, index) => {
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
            {recentProducts &&
              recentProducts.map((item, index) => {
                return (
                  <Col key={index} sm={6} xl={2} lg={2}>
                    <ProductCard data={item?.metadata}></ProductCard>
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
