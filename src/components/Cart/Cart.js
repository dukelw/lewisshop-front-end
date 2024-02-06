import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import CartShop from '../CartShop';
import { ArrowLeftIcon } from '../Icons/index';
import Button from '../Button';
import { createAxios } from '~/createAxios';
import styles from './Cart.module.scss';
import { checkout } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function convertData(data, cartID, cartUserID) {
  const convertedData = {
    cart_id: cartID,
    user_id: cartUserID,
    shop_order_ids: [],
  };

  data.forEach((product) => {
    const shopIndex = convertedData.shop_order_ids.findIndex((shop) => shop.shop_id === product.shop_id);

    if (shopIndex !== -1) {
      convertedData.shop_order_ids[shopIndex].item_products.push({
        price: product.product_price,
        quantity: product.quantity,
        product_id: product.product_id,
      });
    } else {
      convertedData.shop_order_ids.push({
        shop_id: product.shop_id,
        shop_discounts: [],
        item_products: [
          {
            price: product.product_price,
            quantity: product.quantity,
            product_id: product.product_id,
          },
        ],
      });
    }
  });

  return convertedData;
}

function Cart() {
  const currentCart = useSelector((state) => state?.authUser.getCart.cart);
  const cartProducts = currentCart?.metadata.cart_products;
  const cartUserID = currentCart?.metadata.cart_user_id;
  const cartID = currentCart?.metadata._id;
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const currentCheckout = useSelector((state) => state?.order.checkout.checkoutResult);
  const checkoutOrder = currentCheckout?.metadata.checkout_order;

  useEffect(() => {
    const checkoutCart = convertData(cartProducts, cartID, cartUserID);
    console.log('Checkout cart:', checkoutCart);
    checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
  }, [currentCart]);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('header')}>Shopping Cart</h1>
      <Link className={cx('sub-header')} to={'/products'}>
        <h2 className={cx('sub-header')}>
          <ArrowLeftIcon></ArrowLeftIcon>
          Continue Shopping
        </h2>
      </Link>
      <Container>
        <Row>
          <Col className={cx('left')} md={8}>
            <Container>
              <Row>
                <Col className={cx('title')} md={4}>
                  Product
                </Col>
                <Col className={cx('title')} md={2}>
                  Unit Price
                </Col>
                <Col className={cx('title')} md={2}>
                  Quantity
                </Col>
                <Col className={cx('title')} md={2}>
                  Total
                </Col>
                <Col className={cx('title')} md={2}>
                  Selection
                </Col>
              </Row>
              <Row>
                <CartShop></CartShop>
              </Row>
            </Container>
          </Col>
          <Col md={4}>
            <div className={cx('checkout')}>
              <div className={cx('top')}>
                <p className={cx('title')}>
                  Do you have a voucher? <span>(Optional)</span>
                </p>
                <div className={cx('actions')}>
                  <Button className={cx('btn')} outline large>
                    Enter the code
                  </Button>
                  <Button className={cx('btn')} primary large>
                    Redeem
                  </Button>
                </div>
              </div>
              <div className={cx('bottom')}>
                <div className={cx('review')}>
                  <div className={cx('price')}>
                    <p className={cx('title')}>Subtotal</p>
                    <p className={cx('money')}>{checkoutOrder?.totalPrice}</p>
                  </div>
                  <div className={cx('other-price')}>
                    <p className={cx('other-title')}>Shipping</p>
                    <p className={cx('other-money')}>{checkoutOrder?.feeShip}</p>
                  </div>
                </div>
                <div className={cx('price')}>
                  <p className={cx('title')}>Discount</p>
                  <p className={cx('money')}>{checkoutOrder?.totalDiscount}</p>
                </div>
                <div className={cx('price')}>
                  <p className={cx('title')}>Total</p>
                  <p className={cx('money')}>{checkoutOrder?.totalCheckout}</p>
                </div>
                <div className={cx('price')}>
                  <Button className={cx('btn')} primary large>
                    Safe to checkout
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
