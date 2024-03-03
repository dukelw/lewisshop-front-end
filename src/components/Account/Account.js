import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Container, Row, Col, Form } from 'react-bootstrap';
import styles from './Account.module.scss';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import { getAllOrders, getAllOrdersByStatus } from '~/redux/apiRequest';
import Update from './Mode/Update';

const cx = className.bind(styles);

function Account() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const [status, setStatus] = useState('all');

  return (
    <Tabs defaultActiveKey="info" id="justify-tab-example" className="mb-3" fill>
      <Tab tabClassName={cx('tab')} eventKey="info" title="Your information">
        <Container>
          <Row>
            <Update />
          </Row>
        </Container>
      </Tab>
      <Tab tabClassName={cx('tab')} eventKey="bank" title="Bank"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="address" title="Address"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="password" title="Change password"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="notification" title="Notification Setting"></Tab>
    </Tabs>
  );
}

export default Account;
