import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '~/createAxios';
import styles from './PurchaseItem.module.scss';

const cx = classNames.bind(styles);

function PurchaseItem({ product }) {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);

  const handleRestore = (e, productID) => {
    const data = {
      user_id: userID,
      product_id: productID,
    };
  };

  return (
    <Container>
      <Row className={cx('container')}>
        <Col className={cx('field')} md={4}>
          <div className={cx('info')}>
            <img className={cx('img')} src={product.thumb} alt="Product" />
            <div className={cx('text')}>
              <p className={cx('name')}>{product.name}</p>
              <p className={cx('description')}>{product.description}</p>
            </div>
          </div>
        </Col>
        <Col className={cx('field')} md={2}>
          <p className={cx('number')}>{product.price}</p>
        </Col>
        <Col className={cx('field')} md={2}>
          <div className={cx('quantity')}>
            <p>{product.quantity}</p>
          </div>
        </Col>
        <Col className={cx('field')} md={2}>
          <p className={cx('number')}>{product.quantity * product.price}</p>
        </Col>
        <Col className={cx('field')} md={2}>
          <p className={cx('action')} onClick={(e) => handleRestore(e, product.product_id)}>
            Restore
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PurchaseItem;
