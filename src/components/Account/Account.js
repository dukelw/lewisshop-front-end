import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Account.module.scss';
import { createAxios } from '~/createAxios';
import { useEffect, useState } from 'react';
import { getAllOrders, getAllOrdersByStatus } from '~/redux/apiRequest';

const cx = className.bind(styles);

function Account() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const [status, setStatus] = useState('all');

  return <h1>Hello</h1>;
}

export default Account;
