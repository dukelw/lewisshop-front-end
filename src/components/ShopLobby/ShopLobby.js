import { Container, Row, Col } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ShopLobby.module.scss';
import { DongIcon, InfoIcon, NotificationIcon, ShopIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import Notification from '../Notification';
import Shop from '../Shop';
import Main from '../Main';
import DiscountDisplay from '../DiscountDisplay';
import { findShopByID } from '~/redux/apiRequest';

const cx = className.bind(styles);

function ShopLobby() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const shopID = currentShop?.metadata.shop._id;
  const shopInfo = useSelector((state) => state?.shop.shop?.foundShop);
  const shop = shopInfo?.metadata;
  const axiosJWT = createAxios(currentShop);
  const [mainContent, setMainContent] = useState(JSON.parse(localStorage.getItem('tab')) || 'main');

  useEffect(() => {
    findShopByID(shopID, dispatch, axiosJWT);
  }, []);

  const handleChangeTab = (tab) => {
    localStorage.setItem('tab', JSON.stringify(tab));
    setMainContent(tab);
  };

  return (
    <Container className={cx('wrapper')}>
      <Row>
        <Col md={2}>
          <div className={cx('user-info')}>
            <img className={cx('avatar')} src={shop?.thumb} alt="Shop Avatar" />
            <div className={cx('infor')}>
              <p className={cx('name')}>{shop?.name}</p>
              <span className={cx('edit')}>{shop?.email}</span>
            </div>
          </div>
          <ul className={cx('options')}>
            <li
              onClick={() => {
                handleChangeTab('main');
              }}
              className={cx('item', mainContent === 'main' ? 'user-option-active' : '')}
            >
              <ShopIcon />
              <span className={cx('title')}>My shop</span>
            </li>
            <li
              onClick={() => {
                handleChangeTab('shop');
              }}
              className={cx('item', mainContent === 'shop' ? 'user-option-active' : '')}
            >
              <InfoIcon />
              <span className={cx('title')}>My info</span>
            </li>
            <li
              onClick={() => {
                handleChangeTab('noti');
              }}
              className={cx('item', mainContent === 'noti' ? 'user-option-active' : '')}
            >
              <NotificationIcon />
              <span className={cx('title')}>Notification</span>
            </li>
            <li
              onClick={() => {
                handleChangeTab('voucher');
              }}
              className={cx('item', mainContent === 'voucher' ? 'user-option-active' : '')}
            >
              <DongIcon />
              <span className={cx('title')}>Voucher</span>
            </li>
          </ul>
        </Col>
        <Col md={10}>
          {mainContent === 'main' ? (
            <Main />
          ) : mainContent === 'shop' ? (
            <Shop />
          ) : mainContent === 'noti' ? (
            <Notification />
          ) : mainContent === 'voucher' ? (
            <DiscountDisplay />
          ) : (
            ''
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ShopLobby;
