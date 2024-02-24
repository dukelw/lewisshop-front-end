import React from 'react';
import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './PurchaseHistory.module.scss';
import PurchaseItem from '../PurchaseItem';

const cx = classNames.bind(styles);

function PurchaseHistory() {
  const currentOrders = useSelector((state) => state?.order.orders.allOrder);
  const orderProducts = currentOrders?.metadata;
  const productGroups = [];
  let Purchase = [];

  function classify(orderDate, groups) {
    const ShopElements = Object.keys(groups).map((shopId) => {
      const { shop_name, products } = groups[shopId];

      console.log(shop_name, products);

      return (
        <Container className={cx('shop')} key={shopId}>
          <Row>
            <h3 className={cx('name')}>{shop_name}</h3>
            {products.map((product) => (
              <PurchaseItem key={product.product_id} product={product}>
                {product?.product_name}
              </PurchaseItem>
            ))}
          </Row>
        </Container>
      );
    });

    return (
      <>
        <p className={cx('date')}>{orderDate}</p>
        {ShopElements}
      </>
    );
  }

  orderProducts?.forEach((order) => {
    const products = order.order_products;
    products.forEach((product) => {
      if (!productGroups[product.shop_id]) {
        productGroups[product.shop_id] = {
          shop_name: product.shop_name,
          products: [],
        };
      }
      productGroups[product.shop_id].products.push(...product.item_products);
    });
    console.log('Product groups: ', productGroups);
    Purchase.push(classify(order.createdAt, productGroups));
  });

  return Purchase.map((Order, index) => (
    <Container key={index} className={cx('order')}>
      {Order}
    </Container>
  ));
}

export default PurchaseHistory;
