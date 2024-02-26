import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import CartShop from '../CartShop';
import { ArrowLeftIcon } from '../Icons/index';
import Button from '../Button';
import DiscountModal from '../DiscountModal';
import { createAxios } from '~/createAxios';
import styles from './Cart.module.scss';
import { checkout, getDiscountsOfShopsByUser } from '~/redux/apiRequest';
import { checkoutFailed } from '~/redux/orderSlice';

const cx = classNames.bind(styles);

function Cart() {
  const currentCart = useSelector((state) => state?.authUser.getCart.cart);
  const cartProducts = currentCart?.metadata.cart_products;
  const currentDiscount = useSelector((state) => state?.discount.discounts.foundDiscounts);
  const discountCodes = currentDiscount?.metadata;
  const cartUserID = currentCart?.metadata.cart_user_id;
  const cartID = currentCart?.metadata._id;
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const currentCheckout = useSelector((state) => state?.order.checkout.checkoutResult);
  const checkoutOrder = currentCheckout?.metadata.checkout_order;
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [checked, setChecked] = useState(true);
  const handleCheckout = () => {
    setChecked(!checked);
    if (!checked) {
      const checkoutCart = convertData(cartProducts, cartID, cartUserID);
      localStorage.setItem('checkoutCart', JSON.stringify(checkoutCart));
      checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
    } else {
      localStorage.removeItem('checkoutCart');
      dispatch(checkoutFailed());
    }
  };

  const handleAllCart = (isChecked, productGroups) => {
    if (!isChecked) {
      setChecked(false);
      return;
    } else {
      const numberOfShops = [];
      Object.keys(productGroups).forEach((shopId) => {
        numberOfShops.push(shopId);
      });
      let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart'));
      const checkedShops = checkoutCart?.shop_order_ids.filter((order) => order.item_products.length > 0);
      const isCheckedAll = numberOfShops.length === checkedShops.length;
      setChecked(isCheckedAll);
    }
  };

  const handleSelectDiscount = (code, discountID, shopID) => {
    const discountableCart =
      JSON.parse(localStorage.getItem('discountableCart')) || convertData(cartProducts, cartID, cartUserID);
    // eslint-disable-next-line array-callback-return
    discountableCart.shop_order_ids.map((shop) => {
      if (shop.shop_id === shopID) {
        // When discounts of the shop have not been used yet
        if (shop.shop_discounts.length === 0) {
          // Add a new discount
          shop.shop_discounts.push({
            shop_id: shopID,
            discount_id: discountID,
            code: code,
          });
          setSelectedDiscount((prev) => [...prev, { code, shop_id: shopID }]);
        } else {
          // When a discount of the shop has been used
          // Delete old discount
          const isSameShop = selectedDiscount.find((discount) => {
            return discount.shop_id === shopID;
          });
          if (isSameShop) {
            setSelectedDiscount((prev) => {
              const discounts = prev.filter((discount) => discount !== isSameShop);
              return [...discounts, { code, shop_id: shopID }];
            });
            // Add new discount
            shop.shop_discounts = shop.shop_discounts.filter((discount) => discount.code !== isSameShop.code);
            shop.shop_discounts.push({
              shop_id: shopID,
              discount_id: discountID,
              code: code,
            });
          } else {
            setSelectedDiscount((prev) => {
              return [...prev, { code, shop_id: shopID }];
            });
          }
        }
      }
    });
    localStorage.setItem('discountableCart', JSON.stringify(discountableCart));
    checkout(accessToken, userID, discountableCart, dispatch, axiosJWT);
    setModalVisible(false);
  };

  const handleRedeem = () => {
    localStorage.removeItem('discountableCart');
    setSelectedDiscount([]);
    const discountableCart = convertData(cartProducts, cartID, cartUserID);
    checkout(accessToken, userID, discountableCart, dispatch, axiosJWT);
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
              thumb: product.product_thumb,
              description: product.product_description,
              name: product.product_name,
            },
          ],
        });
      }
    });
    return convertedData;
  }

  useEffect(() => {
    const checkoutCart = convertData(cartProducts, cartID, cartUserID);
    checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
    getDiscountsOfShopsByUser(accessToken, userID, currentShops, dispatch, axiosJWT);
    const handleBeforeUnload = (event) => {
      localStorage.removeItem('checkoutCart');
      dispatch(checkoutFailed());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Col className={cx('title')} md={5}>
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
                <Col className={cx('title')} md={1}>
                  Selection
                </Col>
              </Row>
              <Row>
                <Form.Check
                  className={cx('name')}
                  type="checkbox"
                  id={`allCheckbox`}
                  label={`All`}
                  checked={checked}
                  onChange={(e) => handleCheckout()}
                />
                <CartShop allCart={checked} handleAllCart={handleAllCart}></CartShop>
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
                  <DiscountModal
                    discountCodes={discountCodes}
                    onSelectDiscount={handleSelectDiscount}
                    currentCheckout={currentCheckout}
                    isDisplay={modalVisible}
                    hide={handleEnterCodeClick}
                    className={cx('discount-modal')}
                  >
                    <Button onClick={handleEnterCodeClick} className={cx('discount-btn')} outline large>
                      Enter the code
                    </Button>
                  </DiscountModal>
                  <Button onClick={handleRedeem} className={cx('btn')} primary large>
                    Redeem
                  </Button>
                </div>
              </div>
              <div className={cx('bottom')}>
                <div className={cx('review')}>
                  <div className={cx('price')}>
                    <p className={cx('money-title')}>Subtotal</p>
                    <p className={cx('money')}>{checkoutOrder?.totalPrice || 0}</p>
                  </div>
                  <div className={cx('other-price')}>
                    <p className={cx('other-title')}>Shipping</p>
                    <p className={cx('other-money')}>{checkoutOrder?.feeShip || 0}</p>
                  </div>
                </div>
                {selectedDiscount.length > 0 && (
                  <div className={cx('price')}>
                    <p className={cx('money-title')}>Selected Discount Code</p>
                    <p className={cx('money')}>
                      {selectedDiscount.map((discount, index) => {
                        return (
                          <span key={index}>
                            {discount.code} <br />
                          </span>
                        );
                      })}
                    </p>
                  </div>
                )}
                <div className={cx('price')}>
                  <p className={cx('money-title')}>Discount</p>
                  <p className={cx('money')}>{checkoutOrder?.totalDiscount || 0}</p>
                </div>
                <div className={cx('price')}>
                  <p className={cx('money-title')}>Total</p>
                  <p className={cx('money')}>{checkoutOrder?.totalCheckout || 0}</p>
                </div>
                <div className={cx('price')}>
                  <Link className={cx('link')} to={'/checkout'}>
                    <Button className={cx('btn')} primary large>
                      Safe to checkout
                    </Button>
                  </Link>
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
