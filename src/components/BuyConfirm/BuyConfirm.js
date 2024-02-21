import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from './BuyConfirm.module.scss';
import { createAxios } from '~/createAxios';
import { useNavigate } from 'react-router-dom';
import { payment } from '~/redux/apiRequest';
import { paymentSuccess } from '~/redux/paymentSlice';

const cx = classNames.bind(styles);

function DeleteConfirm({ children, paymentData, userData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleBuy = () => {
    if (userData.paymentMethod === 'momo') {
      payment(accessToken, userID, { amount: paymentData.total }, dispatch, navigate, axiosJWT);
      navigate('/payment/momo');
    } else if (userData.paymentMethod === 'zalo') {
      navigate('/payment/zalo-pay');
    } else if (userData.paymentMethod === 'bank') {
      const myInfo = {
        myBank: 'MB',
        accountID: '0002120926563',
      };
      const orderId = currentUser?.metadata.user._id + new Date().getTime();
      const orderContent = 'Transaction' + orderId;
      const qrCodeUrl = `https://img.vietqr.io/image/${myInfo.myBank}-${myInfo.accountID}-qr_only.png?amount=${paymentData.total}&addInfo=${orderContent}&accountName=LE%20PHAN%20THE%20VI`;
      const metadata = {
        partnerCode: 'Banking',
        orderId,
        requestId: orderId,
        amount: paymentData.total,
        responseTime: '',
        message: 'Thành công.',
        resultCode: 0,
        payUrl: '',
        deeplink: '',
        qrCodeUrl,
        orderContent,
      };
      dispatch(paymentSuccess({ metadata }));
      navigate('/payment/banking');
    } else if (userData.paymentMethod === 'cod') {
      navigate('/thanks');
    }
    handleClose();
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => handleShow() })}

      <Modal contentClassName={cx('inner')} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx('heading')}>
            Are you sure to pay this bill? If everything is alright, click "Continue"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx('body')}>
          <Container>
            <Row className={cx('title')}>Your information</Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Name
              </Col>
              <Col md={6} className={cx('text')}>
                {userData.name}
              </Col>
            </Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Telephone
              </Col>
              <Col md={6} className={cx('text')}>
                {userData.tel}
              </Col>
            </Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Email
              </Col>
              <Col md={6} className={cx('text')}>
                {userData.email}
              </Col>
            </Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Address
              </Col>
              <Col md={6} className={cx('text')}>
                {userData.address}
              </Col>
            </Row>
            {userData.note && (
              <Row>
                <Col md={6} className={cx('label')}>
                  Note
                </Col>
                <Col md={6} className={cx('text')}>
                  {userData.note}
                </Col>
              </Row>
            )}
          </Container>
          <Container>
            <Row className={cx('title')}>Payment</Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Subtotal
              </Col>
              <Col md={6} className={cx('price')}>
                {paymentData.subtotal}
              </Col>
            </Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Shipping
              </Col>
              <Col md={6} className={cx('price')}>
                {paymentData.feeShip}
              </Col>
            </Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Discount
              </Col>
              <Col md={6} className={cx('price')}>
                {paymentData.discount}
              </Col>
            </Row>
            <Row>
              <Col md={6} className={cx('label')}>
                Total
              </Col>
              <Col md={6} className={cx('price')}>
                {paymentData.total}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className={cx('button')} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className={cx('button')} variant="success" onClick={handleBuy}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirm;
