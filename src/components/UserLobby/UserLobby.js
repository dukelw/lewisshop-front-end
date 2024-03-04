import { Container, Row, Col } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserLobby.module.scss';
import { DongIcon, MoneyBillIcon, NotificationIcon, UserIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import Purchase from '../Purchase';
import Notification from '../Notification';
import Account from '../Account';
import DiscountDisplay from '../DiscountDisplay';
import { findUser } from '~/redux/apiRequest';

const cx = className.bind(styles);

function UserLobby() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userInfo = useSelector((state) => state?.authUser.findUser?.foundUser);
  const user = userInfo?.metadata.user;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const [mainContent, setMainContent] = useState(JSON.parse(localStorage.getItem('tab')) || 'purchase');

  useEffect(() => {
    findUser(accessToken, userID, userID, dispatch, axiosJWT);
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
            <img className={cx('avatar')} src={user?.thumb} alt="User Avatar" />
            <div className={cx('infor')}>
              <p className={cx('name')}>{user?.name}</p>
              <span className={cx('edit')}>Edit information</span>
            </div>
          </div>
          <ul className={cx('options')}>
            <li
              onClick={() => {
                handleChangeTab('account');
              }}
              className={cx('item', mainContent === 'account' ? 'user-option-active' : '')}
            >
              <UserIcon />
              <span className={cx('title')}>My account</span>
            </li>
            <li
              onClick={() => {
                handleChangeTab('purchase');
              }}
              className={cx('item', mainContent === 'purchase' ? 'user-option-active' : '')}
            >
              <MoneyBillIcon />
              <span className={cx('title')}>My purchase</span>
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
          {mainContent === 'purchase' ? (
            <Purchase />
          ) : mainContent === 'account' ? (
            <Account />
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

export default UserLobby;
