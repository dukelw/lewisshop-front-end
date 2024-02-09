import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ToastMessage.module.scss';
import { CircleCheckIcon, CircleInfoIcon, CircleXMarkIcon, TriangleExclamationIcon, XMarkIcon } from '../Icons';

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

function ToastMessage({ message = 'Toast message', type = 'success', isShow = false }) {
  const [show, setShow] = useState(isShow);
  const [hide, setHide] = useState(!isShow);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  const removeToast = () => {
    setShow(false);
  };

  const Component = toastDetails[type]?.icon;
  return (
    show && (
      <div className={cx('toast', type, 'show')}>
        <div className={cx('column')}>
          <Component className={cx('icon')} />
          <span>{message}</span>
        </div>
        <XMarkIcon className={cx('close')} onClick={removeToast}></XMarkIcon>
      </div>
    )
  );
}

export default ToastMessage;
