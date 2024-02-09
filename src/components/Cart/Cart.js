import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import CartShop from '../CartShop';
import { ArrowLeftIcon } from '../Icons/index';
import Button from '../Button';
import DiscountModal from '../DiscountModal';
import { createAxios } from '~/createAxios';
import styles from './Cart.module.scss';
import { checkout, getDiscountsOfShopsByUser } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

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
  const currentDiscount = useSelector((state) => state?.discount.discounts.foundDiscounts);
  const discountCodes = currentDiscount?.metadata;
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectDiscount = (code, discountID, shopID) => {
    const discountableCart =
      JSON.parse(localStorage.getItem('discountableCart')) || convertData(cartProducts, cartID, cartUserID);
    discountableCart.shop_order_ids.map((shop) => {
      if (shop.shop_id === shopID) {
        shop.shop_discounts.push({
          shop_id: shopID,
          discount_id: discountID,
          code: code,
        });
      }
    });
    localStorage.setItem('discountableCart', JSON.stringify(discountableCart));
    console.log(`Discountable cart:::`, discountableCart);
    checkout(accessToken, userID, discountableCart, dispatch, axiosJWT);
    if (selectedDiscount.indexOf(code) === -1) setSelectedDiscount((prev) => [...prev, code]);
    setModalVisible(false);
  };

  const handleEnterCodeClick = () => {
    setModalVisible(!modalVisible);
  };
  const currentShops = [];

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
        currentShops.push(product.shop_id);
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

  useEffect(() => {
    const checkoutCart = convertData(cartProducts, cartID, cartUserID);
    console.log('Checkout cart:', checkoutCart);
    getDiscountsOfShopsByUser(accessToken, userID, currentShops, dispatch, axiosJWT);
    checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
  }, [currentCart]);

  return (
    <div className={cx('wrapper')}>
      {modalVisible && (
        <DiscountModal
          discountCodes={discountCodes}
          onSelectDiscount={handleSelectDiscount}
          handleDisplay={handleEnterCodeClick}
        />
      )}
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
                  <Button onClick={handleEnterCodeClick} className={cx('btn')} outline large>
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
                {selectedDiscount.length > 0 && (
                  <div className={cx('price')}>
                    <p className={cx('title')}>Selected Discount Code</p>
                    <p className={cx('money')}>{selectedDiscount.join(', ')}</p>
                  </div>
                )}
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
