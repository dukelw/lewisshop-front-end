import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Notification.module.scss';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import { getAllOrders, getAllOrdersByStatus } from '~/redux/apiRequest';

const cx = className.bind(styles);

function Notification() {
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

  return <h1>Hello</h1>;
}

export default Notification;
