import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import QRCode from '~/components/QRCode';
import styles from './Payment.module.scss';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Payment() {
  const { method } = useParams();
  const currenPayment = useSelector((state) => state?.payment.method.data);
  const payment = currenPayment?.metadata || [];

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('instruction')}>
          <div className={cx('info')}>
            <h1>Order Information</h1>
            <div className={cx('box')}>
              <h4>Provider</h4>
              <p>{payment.partnerCode}</p>
            </div>
            <div className={cx('box')}>
              <h4>Order Code</h4>
              <p>{payment.orderId}</p>
            </div>
            <div className={cx('box')}>
              <h4>Description</h4>
              <p>{payment.orderId}</p>
            </div>
            <div className={cx('box')}>
              <h4>Amount</h4>
              <p>{payment.amount}</p>
            </div>
          </div>
          <div className={cx('timer')}>
            <h1>
              Expired in <span className={cx('time')}>1h30</span>
            </h1>
          </div>
        </div>
        <div className={cx('background')} style={{ backgroundColor: 'linear-gradient(0deg, #c1177c, #e11b90)' }}>
          {method === 'momo' ? <QRCode url={payment.qrCodeUrl}></QRCode> : <img src="" alt="QR Code" />}
          <p>
            {method === 'momo'
              ? 'Open your MOMO app and scan this QR'
              : 'Please complete the transaction with your Internet Banking'}
          </p>
          <p className={cx('content')}>Transaction content: </p>
          <p className={cx('amount')}>Transaction amount: {payment.amount}</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
