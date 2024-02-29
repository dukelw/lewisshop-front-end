import { Tabs, Tab } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Purchase.module.scss';
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
  const axiosJWT = createAxios(currentUser);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    if (status === 'all') {
      getAllOrders(accessToken, userID, dispatch, axiosJWT);
    } else {
      getAllOrdersByStatus(accessToken, userID, status, dispatch, axiosJWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleTabSelect = (key) => {
    setStatus(key);
  };

  return (
    <Tabs onSelect={handleTabSelect} defaultActiveKey="all" id="justify-tab-example" className="mb-3" fill>
      <Tab tabClassName={cx('tab')} eventKey="all" title="All">
        <PurchaseHistory status={'all'} />
      </Tab>
      <Tab tabClassName={cx('tab')} eventKey="pending" title="Waiting to pay">
        <PurchaseHistory status={'pending'} />
      </Tab>
      <Tab tabClassName={cx('tab')} eventKey="confirming" title="Waiting shop confirmation">
        <PurchaseHistory status={'confirming'} />
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
  );
}

export default Purchase;
