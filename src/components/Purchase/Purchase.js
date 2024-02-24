import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Purchase.module.scss';
import { DongIcon, MoneyBillIcon, NotificationIcon, UserIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { useEffect } from 'react';
import { getAllOrders } from '~/redux/apiRequest';
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

  useEffect(() => {
    getAllOrders(accessToken, userID, dispatch, axiosJWT);
  }, []);

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
          <Tabs defaultActiveKey="all" id="justify-tab-example" className="mb-3" fill>
            <Tab tabClassName={cx('tab')} eventKey="all" title="All">
              <PurchaseHistory />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="waiting-to-pay" title="Waiting to pay">
              <PurchaseHistory />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="shipping" title="Shipping">
              <PurchaseHistory />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="waiting-to-delivery" title="Waiting to delivery">
              <PurchaseHistory />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="completed" title="Completed">
              <PurchaseHistory />
            </Tab>
            <Tab tabClassName={cx('tab')} eventKey="canceled" title="Canceled">
              <PurchaseHistory />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Purchase;
