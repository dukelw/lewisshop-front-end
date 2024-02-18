import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import BuyConfirm from '../BuyConfirm';
import styles from './OrderModal.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function OrderModal({ children, data = {} }) {
  const [show, setShow] = useState(false);
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
    // Add logic to handle form submission
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => setShow(true) })}

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        aria-labelledby="example-custom-modal-styling-title"
        backdropClassName={cx('wrapper')}
        dialogClassName={cx('modal')}
        contentClassName={cx('inner')}
      >
        <Modal.Header className={cx('heading')} closeButton>
          <Modal.Title className={cx('header')} id="example-custom-modal-styling-title">
            Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem excepturi eum
                              qui quis nulla officiis laboriosam incidunt unde, impedit molestias maxime? Nihil
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
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. In repudiandae minima harum nihil
                              nisi at voluptatibus totam pariatur laboriosam quos, eligendi est cupiditate optio
                              consequuntur id neque velit vel aliquid?
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
              <BuyConfirm paymentData={data} userData={formData}>
                <Button large className={cx('submit')} primary onClick={handleSubmit}>
                  Pay
                </Button>
              </BuyConfirm>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderModal;
