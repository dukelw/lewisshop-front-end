import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import styles from './ToastMessage.module.scss';
import { CircleCheckIcon, CircleInfoIcon, CircleXMarkIcon, TriangleExclamationIcon, XMarkIcon } from '../Icons';
import { removeToast } from '~/redux/multiToastSlice';

const cx = classNames.bind(styles);

const toastDetails = {
  success: {
    icon: CircleCheckIcon,
  },
  error: {
    icon: CircleXMarkIcon,
  },
  warning: {
    icon: TriangleExclamationIcon,
  },
  info: {
    icon: CircleInfoIcon,
  },
};

function ToastMessage({ id, message = 'Toast message', type = 'success' }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(id));
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  const Component = toastDetails[type]?.icon;

  return (
    <div className={cx('toast', type, 'show')}>
      <div className={cx('column')}>
        <Component className={cx('icon')} />
        <span>{message}</span>
      </div>
      <XMarkIcon className={cx('close')} onClick={() => dispatch(removeToast(id))} />
    </div>
  );
}

export default ToastMessage;
