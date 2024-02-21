import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import QRCode from '~/components/QRCode';
import styles from './Payment.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Payment() {
  let isSuccess = false;
  let intervalID = 0;
  const navigate = useNavigate();
  const { method } = useParams();
  const currenPayment = useSelector((state) => state?.payment.method.data);
  const payment = currenPayment?.metadata || [];

  const checkPaidByBanking = async (amount, content) => {
    if (isSuccess) {
      return;
    } else {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbwvvW7i5Ny3NHbA3cTOOkEoEccJxe44fLDwPysVb8SfawJyY4SFqic7RD3tiXIcnfDUpw/exec',
        );
        const data = await response.json();
        const latestPaid = data.data[data.data.length - 1];
        const latestPrice = latestPaid['Giá trị'];
        const latestContent = latestPaid['Mô tả'];
        if (latestPrice >= amount && latestContent.includes(content)) {
          isSuccess = true;
          navigate('/thanks');
          clearInterval(intervalID);
        } else {
          console.log('Failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (method === 'banking' && !isSuccess) {
    setTimeout(() => {
      intervalID = setInterval(() => {
        checkPaidByBanking(payment.amount, payment.orderContent);
      }, 2000);
    }, 10000);
  }

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
            {method === 'banking' && (
              <div className={cx('box')}>
                <h4>Description</h4>
                <p>{payment.orderContent}</p>
              </div>
            )}
            <div className={cx('box')}>
              <h4>Amount</h4>
              <p>{payment.amount}</p>
            </div>
          </div>
        </div>
        <div className={cx('background')} style={{ backgroundColor: 'linear-gradient(0deg, #c1177c, #e11b90)' }}>
          {method === 'momo' && <QRCode url={payment.qrCodeUrl}></QRCode>}
          {method === 'banking' && <img className={cx('qr')} src={payment.qrCodeUrl} alt="QR Code" />}
          <p className={cx('text')}>
            {method === 'momo'
              ? 'Open your MOMO app and scan this QR'
              : 'Please complete the transaction with your Internet Banking'}
          </p>
          <p className={cx('amount')}>Transaction amount: {payment.amount}</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
