import { Container, Row, Col } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserIcon, ShopIcon, NotificationIcon, UsersIcon, StarIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import styles from './Main.module.scss';
import Button from '../Button';
import { getAllPublishOfShop } from '~/redux/apiRequest';
import Discount from '../Discount';
import Voucher from '../Voucher';
import ProductContainer from '../ProductContainer';

const cx = className.bind(styles);

function Main() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const shop = currentShop?.metadata.shop;
  const allProduct = useSelector((state) => state?.products.products.allProducts);
  const products = allProduct?.metadata;
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const loadPaginations = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllPublishOfShop(accessToken, shopID, dispatch, axiosJWT);
  }, []);

  const handleTabSelect = (key) => {
    setStatus(key);
  };

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
        <ProductContainer data={classifiedProducts[type]} part={type} isShopView={true} />
      </Row>,
    );
  }

  return (
    <Container>
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
      <Row>{currentShop ? <Discount /> : <Voucher />}</Row>
      <Row>
        <ProductContainer
          data={products}
          part={'Products'}
          handlePageClick={loadPaginations}
          currentPage={currentPage}
          isShopView={true}
        />
      </Row>
      {rows}
    </Container>
  );
}

export default Main;
