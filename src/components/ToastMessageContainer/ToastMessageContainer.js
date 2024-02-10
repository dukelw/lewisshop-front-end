import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import ToastMessage from '../ToastMessage/ToastMessage';
import styles from './ToastMessageContainer.module.scss';

const cx = classNames.bind(styles);

function ToastMessageContainer() {
  const toasts = useSelector((state) => state?.multiToast.multiToasts.allToasts) || [];
  return (
    <div className={cx('wrapper')}>
      {toasts.map((toast, index) => (
        <ToastMessage key={index} id={index} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
}

export default ToastMessageContainer;
