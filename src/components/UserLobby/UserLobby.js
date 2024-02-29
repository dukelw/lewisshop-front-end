import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserLobby.module.scss';
import { DongIcon, MoneyBillIcon, NotificationIcon, UserIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import Purchase from '../Purchase';

const cx = className.bind(styles);

function UserLobby() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const userName = currentUser?.metadata.user.name;
  const userAvatar = currentUser?.metadata.user.thumb;
  const axiosJWT = createAxios(currentUser);
  const [mainContent, setMainContent] = useState('purchase');

  useEffect(() => {}, []);

  return (
    <Container className={cx('wrapper')}>
      <Row>
        <Col md={2}>
          <div className={cx('user-info')}>
            <img className={cx('avatar')} src={userAvatar} alt="User Avatar" />
            <div className={cx('infor')}>
              <p className={cx('name')}>{userName}</p>
              <span className={cx('edit')}>Edit information</span>
            </div>
          </div>
          <ul className={cx('options')}>
            <li
              onClick={() => {
                setMainContent('account');
              }}
              className={cx('item', mainContent === 'account' ? 'user-option-active' : '')}
            >
              <UserIcon />
              <span className={cx('title')}>My account</span>
            </li>
            <li
              onClick={() => {
                setMainContent('purchase');
              }}
              className={cx('item', mainContent === 'purchase' ? 'user-option-active' : '')}
            >
              <MoneyBillIcon />
              <span className={cx('title')}>My purchase</span>
            </li>
            <li
              onClick={() => {
                setMainContent('noti');
              }}
              className={cx('item', mainContent === 'noti' ? 'user-option-active' : '')}
            >
              <NotificationIcon />
              <span className={cx('title')}>Notification</span>
            </li>
            <li
              onClick={() => {
                setMainContent('voucher');
              }}
              className={cx('item', mainContent === 'voucher' ? 'user-option-active' : '')}
            >
              <DongIcon />
              <span className={cx('title')}>Voucher</span>
            </li>
          </ul>
        </Col>
        <Col md={10}>{mainContent === 'purchase' ? <Purchase /> : ''}</Col>
      </Row>
    </Container>
  );
}

export default UserLobby;
