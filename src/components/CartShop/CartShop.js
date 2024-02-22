import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CartItem from '../CartItem';
import classNames from 'classnames/bind';
import styles from './CartShop.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CartShop() {
  const currentCart = useSelector((state) => state.authUser.getCart.cart);
  const cartProducts = currentCart.metadata.cart_products;
  const currentCheckout = useSelector((state) => state.order.checkout.checkoutResult);
  const checkoutPrices = currentCheckout?.metadata.shop_order_ids_new || [];
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

  const shopElements = Object.keys(productGroups).map((shopId) => {
    const { shop_name, products } = productGroups[shopId];
    const foundShop = checkoutPrices.find((shop) => shop.shop_id === shopId);
    const subTotalPrice = foundShop?.rawPrice;
    const discountedPrice = foundShop?.appliedDiscountPrice;
    const discounted = subTotalPrice - discountedPrice;

    return (
      <Container className={cx('shop')} key={shopId}>
        <Row>
          <h3 className={cx('name')}>{shop_name}</h3>
          {products.map((product) => (
            <CartItem key={product.product_id} product={product}>
              {product?.product_name}
            </CartItem>
          ))}
          <div className={cx('price')}>
            <p className={cx('total')}>Subtotal</p>
            <p className={cx('money')}>{subTotalPrice}</p>
          </div>
          <div className={cx('price')}>
            <p className={cx('total')}>Discount</p>
            <p className={cx('money')}>{discounted}</p>
          </div>
          <div className={cx('price')}>
            <p className={cx('total')}>Total</p>
            <p className={cx('money')}>{discountedPrice}</p>
          </div>
        </Row>
      </Container>
    );
  });

  return shopElements;
}

export default CartShop;
