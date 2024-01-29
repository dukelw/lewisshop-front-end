import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ShopProductCard.module.scss';
import { publishProduct, unpublishProduct } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ShopProductCard = ({ product }) => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product_thumb, product_name, product_description, product_price, product_quantity } = product;

  const handlePublish = (e, id) => {
    e.preventDefault();
    publishProduct(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, id, dispatch, navigate);
  };

  const handleUnpublish = (e, id) => {
    e.preventDefault();
    unpublishProduct(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, id, dispatch, navigate);
  };

  return (
    <Card className={cx('card')}>
      <Card.Img variant="top" src={product_thumb} className={cx('thumb')} />
      <Card.Body className={cx('body')}>
        <Card.Title className={cx('title')}>{product_name}</Card.Title>
        <Card.Text className={cx('description')}>{product_description}</Card.Text>
        <Card.Text className={cx('text')}>
          Price: {product_price} | Quantity: {product_quantity}
        </Card.Text>
      </Card.Body>
      <Card.Footer className={cx('actions')}>
        <Button onClick={(e) => handlePublish(e, product._id)} className={cx('action-button')}>
          Publish
        </Button>
        <Button onClick={(e) => handleUnpublish(e, product._id)} className={cx('action-button')}>
          Unpublish
        </Button>
        <Button onClick={(e) => {}} className={cx('action-button')}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ShopProductCard;
