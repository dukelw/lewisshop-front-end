import { Container, Row, Col } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UserIcon, ShopIcon, NotificationIcon, UsersIcon, StarIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import styles from './ShopView.module.scss';
import Button from '../Button';
import { findShopByID, getAllPublishOfShop } from '~/redux/apiRequest';
import VoucherView from '../VoucherView';
import ProductContainer from '../ProductContainer';
import CategoryContainer from './CategoryContainer';
import { useEffect } from 'react';

const cx = className.bind(styles);

function ShopView() {
  const dispatch = useDispatch();
  const shopID = localStorage.getItem('shopID');
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const productShop = useSelector((state) => state?.shop.shop.foundShop);
  const shop = productShop?.metadata;
  const user = currentUser?.metadata.user;
  const userID = currentUser?.metadata.user._id;
  const allProduct = useSelector((state) => state?.products.products.allProducts);
  const products = allProduct?.metadata;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const handleLoadAllProducts = (page) => {
    getAllPublishOfShop(accessToken, shopID, dispatch, axios);
  };

  useEffect(() => {
    findShopByID(shopID, dispatch, axios);
    handleLoadAllProducts(1);
  }, []);

  const classifiedProducts = {};
  for (const productId in products) {
    const product = products[productId];
    if (!classifiedProducts[product.product_type]) {
      classifiedProducts[product.product_type] = [];
    }
    classifiedProducts[product.product_type].push(product);
  }

  const rows = [];
  for (const type in classifiedProducts) {
    rows.push(
      <Row key={type}>
        <CategoryContainer data={classifiedProducts[type]} part={type} />
      </Row>,
    );
  }

  return (
    <Container>
      <h1 className={cx('heading')}>{shop?.name}</h1>
      <Row className={cx('dark')}>
        <Col className={cx('p-0')} md={4}>
          <div className={cx('background')}>
            <div className={cx('overlay')}></div>
            <div className={cx('user-infor')}>
              <img className={cx('avatar')} src={shop?.thumb} alt="Shop Avatar" />
              <div className={cx('infor')}>
                <p className={cx('name')}>{shop?.name}</p>
                <span className={cx('edit')}>{shop?.email}</span>
              </div>
            </div>
            <div className={cx('actions')}>
              <Button primary>Add</Button>
              <Button primary>Reject</Button>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className={cx('infor')}>
            <div className={cx('detail')}>
              <ShopIcon /> <span>Product: 12</span>
            </div>
            <div className={cx('detail')}>
              <UserIcon /> <span>Following: 25</span>
            </div>
            <div className={cx('detail')}>
              <NotificationIcon /> <span>Reply:95%</span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className={cx('infor')}>
            <div className={cx('detail')}>
              <UsersIcon /> <span>Follower: 368</span>
            </div>
            <div className={cx('detail')}>
              <StarIcon /> <span>Rating: 4.3</span>
            </div>
            <div className={cx('detail')}>
              <UserIcon /> <span>Join: 25 months</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <VoucherView />
      </Row>
      <Row>
        <ProductContainer part={'Products'} getProductsFunction={handleLoadAllProducts} isShopView={true} />
      </Row>
      {rows}
    </Container>
  );
}

export default ShopView;
