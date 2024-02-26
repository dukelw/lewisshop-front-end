import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Purchase.module.scss';
import { DongIcon, MoneyBillIcon, NotificationIcon, UserIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import { getAllOrders, getAllOrdersByStatus } from '~/redux/apiRequest';
import PurchaseHistory from '../PurchaseHistory';

const cx = className.bind(styles);

function Purchase() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const userName = currentUser?.metadata.user.name;
  const userAvatar = currentUser?.metadata.user.thumb;
  const axiosJWT = createAxios(currentUser);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    if (status === 'all') {
      getAllOrders(accessToken, userID, dispatch, axiosJWT);
    } else {
      getAllOrdersByStatus(accessToken, userID, status, dispatch, axiosJWT);
    }
  }, [status]);

  const handleTabSelect = (key) => {
    setStatus(key);
  };

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
            <li className={cx('item')}>
              <UserIcon />
              <span className={cx('title')}>My account</span>
            </li>
            <li className={cx('item')}>
              <MoneyBillIcon />
              <span className={cx('title')}>My purchase</span>
            </li>
            <li className={cx('item')}>
              <NotificationIcon />
              <span className={cx('title')}>Notification</span>
            </li>
            <li className={cx('item')}>
              <DongIcon />
              <span className={cx('title')}>Voucher</span>
            </li>
          </ul>
        </Col>
        <Col md={10}>
          <Tabs onSelect={handleTabSelect} defaultActiveKey="all" id="justify-tab-example" className="mb-3" fill>
            <Tab tabClassName={cx('tab')} eventKey="all" title="All">
              <PurchaseHistory status={'all'} />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="confirming" title="Waiting shop onfirmation">
              <PurchaseHistory status={'confirming'} />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="pending" title="Waiting to pay">
              <PurchaseHistory status={'pending'} />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="delivering" title="Waiting to delivery">
              <PurchaseHistory status={'delivering'} />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="shipped" title="Completed">
              <PurchaseHistory status={'shipped'} />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="canceled" title="Canceled">
              <PurchaseHistory status={'canceled'} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Purchase;
