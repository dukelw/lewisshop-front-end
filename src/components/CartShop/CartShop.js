import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../CartItem';
import classNames from 'classnames/bind';
import styles from './CartShop.module.scss';
import { createAxios } from '~/createAxios';
import { checkout } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function CartShop({ allCart, handleAllCart }) {
  const currentCart = useSelector((state) => state.authUser.getCart.cart);
  const cartID = currentCart?.metadata._id;
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const cartProducts = currentCart.metadata.cart_products;
  const currentCheckout = useSelector((state) => state.order.checkout.checkoutResult);
  const checkoutPrices = currentCheckout?.metadata.shop_order_ids_new || [];
  const axiosJWT = createAxios(currentUser);

  const productGroups = {};

  cartProducts.forEach((product) => {
    if (!productGroups[product.shop_id]) {
      productGroups[product.shop_id] = {
        shop_name: product.shop_name,
        products: [],
      };
    }
    productGroups[product.shop_id].products.push(product);
  });

  const [shopCheckboxes, setShopCheckboxes] = useState({});

  useEffect(() => {
    const numberOfShops = [];
    const updatedCheckboxes = {};
    Object.keys(productGroups).forEach((shopId) => {
      updatedCheckboxes[shopId] = allCart;
      numberOfShops.push(shopId);
    });
    setShopCheckboxes(updatedCheckboxes);
    let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart'));
    const checkedShops = checkoutCart?.shop_order_ids.filter((order) => order.item_products.length > 0);

    // Because setChecked all always make checked similar to it, then we need to re-checked those products which is checked before (For example: All is checked, then 1 and 2 are checked, but when 1 is unchecked, we expect 2 still to be checked and all is unchecked, the code below catch this event by comparing shop number of products and before checked products, then active the checkbox of the products which is appropriate)
    if (numberOfShops?.length > checkedShops?.length) {
      checkedShops.map((shop) => {
        setShopCheckboxes((prevBoxes) => ({
          ...prevBoxes,
          [shop.shop_id]: true,
        }));
      });
    }
  }, [allCart]);

  const handleShopCheckboxChange = (event, shopId) => {
    const isChecked = event.target.checked;
    // Update checkbox status of shop
    setShopCheckboxes((prevBoxes) => ({
      ...prevBoxes,
      [shopId]: isChecked,
    }));

    let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || {
      cart_id: cartID,
      user_id: userID,
      shop_order_ids: [],
      user_address: '',
      user_payment: '',
    };

    if (!isChecked) {
      // If checkbox is not chosen, remove product has product_id from item_products
      checkoutCart.shop_order_ids = checkoutCart.shop_order_ids.map((order) => {
        if (order.shop_id === shopId) {
          order.item_products = [];
        }
        return order;
      });
    } else {
      // If checkbox is chosen, add product to item_products
      const isNewOrder =
        checkoutCart.shop_order_ids.length === 0 ||
        !checkoutCart.shop_order_ids.find((order) => order.shop_id === shopId);
      if (isNewOrder) {
        const item_products = [];
        cartProducts.map((product) => {
          if (product.shop_id === shopId) {
            item_products.push({
              product_id: product.product_id,
              quantity: product.quantity,
            });
          }
          return item_products;
        });
        checkoutCart.shop_order_ids.push({
          shop_id: shopId,
          shop_discounts: [],
          item_products,
        });
      } else {
        const item_products = [];
        cartProducts.map((product) => {
          if (product.shop_id === shopId) {
            item_products.push({
              product_id: product.product_id,
              quantity: product.quantity,
            });
          }
          return item_products;
        });
        checkoutCart.shop_order_ids = checkoutCart.shop_order_ids.map((order) => {
          if (order.shop_id === shopId) {
            order.item_products = item_products;
          }
          return order;
        });
      }
    }

    localStorage.setItem('checkoutCart', JSON.stringify(checkoutCart));
    handleAllCart(isChecked, productGroups);
    checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
  };

  const isShopCheckAll = (shopId) => {
    const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart'));
    const productsOfShop = cartProducts.filter((product) => product.shop_id === shopId);
    const checkedShops = checkoutCart?.shop_order_ids.find((shop) => shop.shop_id === shopId);
    const isCheckedAll = productsOfShop.length === checkedShops?.item_products.length;
    setShopCheckboxes((prevCheckboxes) => {
      return {
        ...prevCheckboxes,
        [shopId]: isCheckedAll,
      };
    });
  };

  const shopElements = Object.keys(productGroups).map((shopId, index) => {
    const { shop_name, products } = productGroups[shopId];
    const foundShop = checkoutPrices.find((shop) => shop.shop_id === shopId);
    const subTotalPrice = foundShop?.rawPrice;
    const discountedPrice = foundShop?.appliedDiscountPrice;
    const discounted = subTotalPrice - discountedPrice || 0;

    return (
      <Container className={cx('shop')} key={index}>
        <Row>
          <Form.Check
            className={cx('name')}
            type="checkbox"
            id={`shopCheckbox-${index}`}
            label={`${shop_name}`}
            checked={shopCheckboxes[shopId]}
            onChange={(e) => handleShopCheckboxChange(e, shopId)}
          />
          {products.map((product, i) => (
            <CartItem key={i} product={product} isAll={shopCheckboxes[shopId]} isShopCheckAll={isShopCheckAll}>
              {product?.product_name}
            </CartItem>
          ))}
          <div className={cx('price')}>
            <p className={cx('total')}>Subtotal</p>
            <p className={cx('money')}>{subTotalPrice || 0}</p>
          </div>
          <div className={cx('price')}>
            <p className={cx('total')}>Discount</p>
            <p className={cx('money')}>{discounted || 0}</p>
          </div>
          <div className={cx('price')}>
            <p className={cx('total')}>Total</p>
            <p className={cx('money')}>{discountedPrice || 0}</p>
          </div>
        </Row>
      </Container>
    );
  });

  return shopElements;
}

export default CartShop;
