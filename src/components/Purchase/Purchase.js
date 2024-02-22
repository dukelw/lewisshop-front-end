import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector, useNavigate } from 'react-redux';
import styles from './Purchase.module.scss';
import { DongIcon, MoneyBillIcon, NotificationIcon, UserIcon } from '../Icons';
import CartShop from '../CartShop';
import { createAxios } from '~/createAxios';

const cx = className.bind(styles);

function Purchase() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userName = currentUser?.metadata.user.name;
  const userAvatar = currentUser?.metadata.user.thumb;
  const axiosJWT = createAxios(currentUser);
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
          <Tabs defaultActiveKey="all" id="fill-tab-example" className="mb-3" fill>
            <Tab eventKey="all" title="All">
              <CartShop />
            </Tab>
            <Tab eventKey="waiting-to-pay" title="Waiting to pay">
              <CartShop />
            </Tab>
            <Tab eventKey="shipping" title="Shipping">
              <CartShop />
            </Tab>
            <Tab eventKey="waiting-to-delivery" title="Waiting to delivery">
              <CartShop />
            </Tab>
            <Tab eventKey="completed" title="Completed">
              <CartShop />
            </Tab>
            <Tab eventKey="canceled" title="Canceled">
              <CartShop />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Purchase;
