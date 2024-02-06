import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '~/createAxios';
import styles from './CartItem.module.scss';
import { SubtractIcon, AddIcon } from '../Icons';
import { deleteProductInCartByID, updateProductInCart } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function CartItem({ product }) {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);

  const handleDelete = (e, productID) => {
    const data = {
      user_id: userID,
      product_id: productID,
    };
    deleteProductInCartByID(accessToken, userID, data, dispatch, axiosJWT);
  };

  // console.log(product);

  const handleClickUpDown = (productID, shopID, oldQuantity, newQuantity, price) => {
    const product = {
      user_id: userID,
      shop_order_ids: [
        {
          shop_id: shopID,
          item_products: [
            {
              quantity: oldQuantity + newQuantity,
              price,
              shop_id: shopID,
              old_quantity: oldQuantity,
              product_id: productID,
            },
          ],
          version: 2000,
        },
      ],
    };
    updateProductInCart(accessToken, userID, product, dispatch, axiosJWT);
  };

  return (
    <Container>
      <Row className={cx('container')}>
        <Col className={cx('field')} md={4}>
          <div className={cx('info')}>
            <img className={cx('img')} src={product.product_thumb} alt="Product" />
            <div className={cx('text')}>
              <p className={cx('name')}>{product.product_name}</p>
              <p className={cx('description')}>{product.product_description}</p>
            </div>
          </div>
        </Col>
        <Col className={cx('field')} md={2}>
          <p className={cx('number')}>{product.product_price}</p>
        </Col>
        <Col className={cx('field')} md={2}>
          <div className={cx('quantity')}>
            <SubtractIcon
              className={cx('icon')}
              onClick={(e) =>
                handleClickUpDown(product.product_id, product.shop_id, product.quantity, -1, product.product_price)
              }
            ></SubtractIcon>
            <p>{product.quantity}</p>
            <AddIcon
              className={cx('icon')}
              onClick={(e) =>
                handleClickUpDown(product.product_id, product.shop_id, product.quantity, 1, product.product_price)
              }
            ></AddIcon>
          </div>
        </Col>
        <Col className={cx('field')} md={2}>
          <p className={cx('number')}>{product.quantity * product.product_price}</p>
        </Col>
        <Col className={cx('field')} md={2}>
          <p className={cx('action')} onClick={(e) => handleDelete(e, product.product_id)}>
            Delete
          </p>
        </Col>
      </Row>
      <p>Total</p>
    </Container>
  );
}

export default CartItem;
