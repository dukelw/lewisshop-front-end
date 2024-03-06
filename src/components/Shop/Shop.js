import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Container, Row } from 'react-bootstrap';
import styles from './Shop.module.scss';
import { createAxios } from '~/createAxios';
import { useState } from 'react';
import Update from './Mode/Update';
import Bank from './Bank';
import Address from './Address';
import Password from './Password';

const cx = className.bind(styles);

function Shop() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);
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
      <Tab tabClassName={cx('tab')} eventKey="bank" title="Bank">
        <Container>
          <Row>
            <Bank />
          </Row>
        </Container>
      </Tab>
      <Tab tabClassName={cx('tab')} eventKey="address" title="Address">
        <Address />
      </Tab>
      <Tab tabClassName={cx('tab')} eventKey="password" title="Change password">
        <Password />
      </Tab>
      <Tab tabClassName={cx('tab')} eventKey="notification" title="Notification Setting"></Tab>
    </Tabs>
  );
}

export default Shop;
