import React from 'react';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './PurchaseHistory.module.scss';
import PurchaseItem from '../PurchaseItem';
import moment from 'moment-timezone';
import STATUS from '~/constants/status';

const cx = classNames.bind(styles);

function PurchaseHistory() {
  const currentOrders = useSelector((state) => state?.order.orders.allOrder);
  const orders = currentOrders?.metadata;
  console.log(orders);
  const productGroups = [];

  orders.forEach((order) => {
    order.order_products.forEach((product) => {
      // Trích xuất thông tin sản phẩm từ mỗi mục
      const { shop_id, rawPrice, appliedDiscountPrice, ...otherProductInfo } = product;

      // Thêm thông tin sản phẩm vào mảng productGroups
      productGroups.push({
        shop_id,
        rawPrice,
        appliedDiscountPrice,
        ...otherProductInfo,
      });
    });
  });

  // In ra kết quả lưu trữ trong productGroups
  console.log(productGroups);

  return orders?.map((order, index) => {
    return (
      <Container className={cx('wrapper')} key={index}>
        <div className={cx('info')}>
          <p className={cx('time')}>
            Order {moment(order.createdAt).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')}
          </p>
          <p className={cx('status')}>
            {STATUS[order.order_status].icon} <span>{STATUS[order.order_status].text}</span>
          </p>
        </div>
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
        {order.order_products?.map((shop, id) => (
          <div key={id}>
            <p className={cx('shop')}>{shop.shop_name}</p>
            {shop.item_products?.map((product, i) => (
              <PurchaseItem key={i} product={product} />
            ))}
          </div>
        ))}
        <Container>
          <Row className={cx('title')}>Payment</Row>
          <Row>
            <Col md={6} className={cx('label')}>
              Subtotal
            </Col>
            <Col md={6} className={cx('price')}>
              {order?.order_checkout?.totalPrice}
            </Col>
          </Row>
          <Row>
            <Col md={6} className={cx('label')}>
              Shipping
            </Col>
            <Col md={6} className={cx('price')}>
              {order?.order_checkout?.feeShip}
            </Col>
          </Row>
          <Row>
            <Col md={6} className={cx('label')}>
              Discount
            </Col>
            <Col md={6} className={cx('price')}>
              {order?.order_checkout?.totalDiscount}
            </Col>
          </Row>
          <Row>
            <Col md={6} className={cx('label')}>
              Total
            </Col>
            <Col md={6} className={cx('price')}>
              {order?.order_checkout?.totalCheckout}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  });
}

export default PurchaseHistory;
