/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '~/createAxios';
import styles from './CartItem.module.scss';
import { SubtractIcon, AddIcon } from '../Icons';
import { checkout, deleteProductInCartByID, updateProductInCart } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function CartItem({ product, isAll, isShopCheckAll }) {
  const currentCart = useSelector((state) => state?.authUser.getCart.cart);
  const cartProducts = currentCart?.metadata?.cart_products;
  const cartID = currentCart?.metadata._id;
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

  const handleClickUpDown = (productID, shopID, oldQuantity, newQuantity, price) => {
    let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || {
      cart_id: cartID,
      user_id: userID,
      shop_order_ids: [],
      user_address: '',
      user_payment: '',
    };

    const productIndex = checkoutCart.shop_order_ids.findIndex((order) => order.shop_id === shopID);

    if (productIndex !== -1) {
      const itemIndex = checkoutCart.shop_order_ids[productIndex].item_products.findIndex(
        (item) => item.product_id === productID,
      );

      if (itemIndex !== -1) {
        checkoutCart.shop_order_ids[productIndex].item_products[itemIndex].quantity += newQuantity;
      } else {
        checkoutCart.shop_order_ids[productIndex].item_products.push({
          quantity: oldQuantity + newQuantity,
          price,
          shop_id: shopID,
          old_quantity: oldQuantity,
          product_id: productID,
        });
      }
    } else {
      checkoutCart.shop_order_ids.push({
        shop_id: shopID,
        shop_discounts: [],
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
      });
    }

    localStorage.setItem('checkoutCart', JSON.stringify(checkoutCart));
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
    if (checked) {
      checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
    }
  };

  const [checked, setChecked] = useState(isAll);

  const handleCheckedAll = () => {
    setChecked(isAll);
    let checkoutCart = JSON.parse(localStorage.getItem('checkoutCart'));
    const productsOfShop = cartProducts?.filter((pro) => pro.shop_id === product.shop_id);
    const checkedShops = checkoutCart?.shop_order_ids.find((shop) => shop.shop_id === product.shop_id);
    const checkedProducts = checkedShops?.item_products;

    // Because setChecked all always make checked similar to it, then we need to re-checked those products which is checked before (For example: All is checked, then 1 and 2 are checked, but when 1 is unchecked, we expect 2 still to be checked and all is unchecked, the code below catch this event by comparing shop number of products and before checked products, then active the checkbox of the products which is appropriate)
    if (productsOfShop?.length > checkedProducts?.length) {
      // eslint-disable-next-line array-callback-return
      checkedProducts?.map((pro) => {
        if (pro.product_id === product.product_id) {
          setChecked(true);
        }
      });
    }
  };

  // Assure that checkbox of CartItem updated when checkbox of CartShop changes
  useEffect(() => {
    handleCheckedAll();
  }, [isAll]);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
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
        if (order.shop_id === product.shop_id) {
          order.item_products = order.item_products.filter((item) => item.product_id !== product.product_id);
        }
        return order;
      });
    } else {
      // If checkbox is chosen, add product to item_products
      const isNewOrder =
        checkoutCart.shop_order_ids.length === 0 ||
        !checkoutCart.shop_order_ids.find((order) => order.shop_id === product.shop_id);
      if (isNewOrder) {
        checkoutCart.shop_order_ids.push({
          shop_id: product.shop_id,
          shop_discounts: [],
          item_products: [
            {
              quantity: product.quantity,
              product_id: product.product_id,
            },
          ],
        });
      } else {
        checkoutCart.shop_order_ids = checkoutCart.shop_order_ids.map((order) => {
          if (order.shop_id === product.shop_id) {
            order.item_products.push({
              quantity: product.quantity,
              product_id: product.product_id,
            });
          }
          return order;
        });
      }
    }

    localStorage.setItem('checkoutCart', JSON.stringify(checkoutCart));
    isShopCheckAll(product.shop_id);
    checkout(accessToken, userID, checkoutCart, dispatch, axiosJWT);
  };

  return (
    <Container>
      <Row className={cx('container')}>
        <Col className={cx('field')} md={5}>
          <Form.Check type="checkbox" id="myCheckbox" label="" checked={checked} onChange={handleCheckboxChange} />
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
        <Col className={cx('field')} md={1}>
          <p className={cx('action')} onClick={(e) => handleDelete(e, product.product_id)}>
            Delete
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default CartItem;
