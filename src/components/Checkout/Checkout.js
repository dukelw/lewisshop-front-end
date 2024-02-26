import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import BuyConfirm from '../BuyConfirm';
import styles from './Checkout.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function Checkout({ data = {} }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const PAYMENT_METHOD = {
    bank: 'Internet Banking',
    momo: 'Momo',
    zalo: 'Zalo Pay',
    cod: 'Cash On Delivery',
  };
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    address: '',
    note: '',
    paymentMethod: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleShow();
    const discountableCart =
      JSON.parse(localStorage.getItem('discountableCart')) || JSON.parse(localStorage.getItem('checkoutCart'));
    const newOrderData = {
      ...discountableCart,
      user_address: formData.address,
      user_payment: PAYMENT_METHOD[formData.paymentMethod],
    };
    setOrderData(newOrderData);
    console.log('Order data at checkout: ', newOrderData);
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('modal')}>
          <div className={cx('inner')}>
            <div className={cx('body')}>
              <Container>
                <Row className={cx('title')}>Shipping Information</Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className={cx('form-group')} controlId="name">
                      <Form.Control
                        value={formData.name}
                        className={cx('form-control')}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className={cx('form-group')} controlId="tel">
                      <Form.Control
                        value={formData.tel}
                        className={cx('form-control')}
                        type="text"
                        name="tel"
                        placeholder="Phone number"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className={cx('form-group')} controlId="email">
                      <Form.Control
                        value={formData.email}
                        className={cx('form-control')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className={cx('form-group')} controlId="address">
                      <Form.Control
                        value={formData.address}
                        className={cx('form-control')}
                        type="address"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className={cx('form-group')} controlId="note">
                      <Form.Control
                        value={formData.note}
                        className={cx('form-control')}
                        type="note"
                        name="note"
                        placeholder="Note"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className={cx('title')}>Payment Method</Row>
                <Row>
                  <Form>
                    <Form.Group>
                      <div>
                        <Form.Check
                          className={cx('check')}
                          type="radio"
                          id="cod"
                          label={
                            <div className={cx('radio')}>
                              <img
                                src="https://www.uplevo.com/blog/wp-content/uploads/2019/07/cod-cash-on-delivery.jpg"
                                alt="COD"
                                width="50"
                                height="50"
                              />
                              <div className={cx('top')}>
                                <span className={cx('name')}>Cash On Delivery</span>
                                <p className={cx('description')}>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem excepturi
                                  eum qui quis nulla officiis laboriosam incidunt unde, impedit molestias maxime? Nihil
                                  consectetur in numquam tempora ad sit perspiciatis.
                                </p>
                              </div>
                            </div>
                          }
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handlePaymentChange}
                        />
                        <Form.Check
                          className={cx('check')}
                          type="radio"
                          id="bank"
                          label={
                            <div className={cx('radio')}>
                              <img
                                src="https://www.shutterstock.com/image-vector/digital-banking-pixel-perfect-linear-600nw-2169814509.jpg"
                                alt="Banking"
                                width="50"
                                height="50"
                              />
                              <div className={cx('top')}>
                                <span className={cx('name')}>Internet Banking</span>
                                <p className={cx('description')}>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In repudiandae minima harum
                                  nihil nisi at voluptatibus totam pariatur laboriosam quos, eligendi est cupiditate
                                  optio consequuntur id neque velit vel aliquid?
                                </p>
                              </div>
                            </div>
                          }
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={handlePaymentChange}
                        />
                        <Form.Check
                          className={cx('check')}
                          type="radio"
                          id="momo"
                          label={
                            <div className={cx('radio')}>
                              <img
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Transparent.png"
                                alt="Momo"
                                width="50"
                                height="50"
                              />
                              <div className={cx('top')}>
                                <span className={cx('name')}>Momo</span>
                                <p className={cx('description')}>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In repudiandae minima harum
                                  nihil nisi at voluptatibus totam pariatur laboriosam quos, eligendi est cupiditate
                                  optio consequuntur id neque velit vel aliquid?
                                </p>
                              </div>
                            </div>
                          }
                          name="paymentMethod"
                          value="momo"
                          checked={formData.paymentMethod === 'momo'}
                          onChange={handlePaymentChange}
                        />
                        <Form.Check
                          className={cx('check')}
                          type="radio"
                          id="zalo"
                          label={
                            <div className={cx('radio')}>
                              <img
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                                alt="Zalo Pay"
                                width="50"
                                height="50"
                              />
                              <div className={cx('top')}>
                                <span className={cx('name')}>Zalo Pay</span>
                                <p className={cx('description')}>
                                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores aliquid ducimus
                                  natus? Et labore in eos aut, numquam architecto cumque dolore modi ab reprehenderit
                                  libero. Necessitatibus ipsam asperiores sunt dolore?
                                </p>
                              </div>
                            </div>
                          }
                          name="paymentMethod"
                          value="zalo"
                          checked={formData.paymentMethod === 'zalo'}
                          onChange={handlePaymentChange}
                        />
                      </div>
                    </Form.Group>
                  </Form>
                </Row>
                <Row>
                  <BuyConfirm
                    handleClose={handleClose}
                    handleShow={handleShow}
                    isShow={show}
                    paymentData={data}
                    userData={formData}
                    orderData={orderData}
                  >
                    <Button large className={cx('submit')} primary onClick={handleSubmit}>
                      Pay
                    </Button>
                  </BuyConfirm>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
