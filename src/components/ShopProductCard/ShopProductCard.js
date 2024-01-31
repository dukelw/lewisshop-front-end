import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { findProductByID } from '~/redux/apiRequest';
import classNames from 'classnames/bind';
import styles from './ShopProductCard.module.scss';
import { publishProduct, unpublishProduct } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ShopProductCard = ({ product, axiosJWT, publishEnable }) => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const accessToken = shop?.metadata.tokens.accessToken;
  const shopID = shop?.metadata.shop._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product_thumb, product_name, product_description, product_price, product_quantity } = product;

  const handlePublish = (e, id) => {
    e.preventDefault();
    publishProduct(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, id, dispatch, navigate, axiosJWT);
  };

  const handleUnpublish = (e, id) => {
    e.preventDefault();
    unpublishProduct(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, id, dispatch, navigate, axiosJWT);
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    findProductByID(accessToken, shopID, product._id, dispatch, axiosJWT).then(navigate(`/shop/edit/${id}`));
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
        {publishEnable && (
          <Button onClick={(e) => handlePublish(e, product._id)} className={cx('action-button')}>
            Publish
          </Button>
        )}
        {!publishEnable && (
          <Button onClick={(e) => handleUnpublish(e, product._id)} className={cx('action-button')}>
            Unpublish
          </Button>
        )}
        <Button onClick={(e) => handleEdit(e, product._id)} className={cx('action-button')}>
          Edit
        </Button>
        <Button onClick={() => {}} className={cx('action-button')}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ShopProductCard;
