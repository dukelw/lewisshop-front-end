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
    return (
      <Container className={cx('shop')} key={shopId}>
        <Row>
          <h3 className={cx('name')}>{shop_name}</h3>
          {products.map((product) => (
            <CartItem key={product.product_id} product={product}>
              {product.product_name}
            </CartItem>
          ))}
        </Row>
      </Container>
    );
  });

  return shopElements;
}

export default CartShop;
