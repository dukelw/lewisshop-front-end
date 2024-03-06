import { Tabs, Tab } from 'react-bootstrap';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Main.module.scss';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import { getAllOrders, getAllOrdersByStatus } from '~/redux/apiRequest';

const cx = className.bind(styles);

function Main() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const [status, setStatus] = useState('all');

  useEffect(() => {}, [status]);

  const handleTabSelect = (key) => {
    setStatus(key);
  };

  return (
    <Tabs onSelect={handleTabSelect} defaultActiveKey="all" id="justify-tab-example" className="mb-3" fill>
      <Tab tabClassName={cx('tab')} eventKey="all" title="All"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="pending" title="Waiting to pay"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="confirming" title="Waiting shop confirmation"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="delivering" title="Waiting to delivery"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="shipped" title="Completed"></Tab>
      <Tab tabClassName={cx('tab')} eventKey="canceled" title="Canceled"></Tab>
    </Tabs>
  );
}

export default Main;
