import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findProductByID } from '~/redux/apiRequest';
import classNames from 'classnames/bind';
import styles from './ShopProductCard.module.scss';
import { publishProduct, unpublishProduct } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ShopProductCard = ({
  product,
  axiosJWT,
  publishEnable,
  discountApplyEnable = false,
  handleApply = () => {},
  handleUnapply = () => {},
  small = false,
}) => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product_thumb, product_name, product_description, product_price, product_quantity } = product;
  const [applied, setApplied] = useState(false);
  const appliedProducts = JSON.parse(localStorage.getItem('formData'))?.discount_product_ids;

  useEffect(() => {
    if (appliedProducts?.includes(product._id)) {
      setApplied(true);
    }
  }, []);

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
    findProductByID(product._id, dispatch, axiosJWT).then(navigate(`/shop/edit/${id}`));
  };

  return (
    <Card className={cx('card', small ? 'small' : '')}>
      <Card.Img variant="top" src={product_thumb} className={cx('thumb')} />
      <Card.Body className={cx('body')}>
        <Card.Title className={cx('title')}>{product_name}</Card.Title>
        <Card.Text className={cx('description')}>{product_description}</Card.Text>
        <Card.Text className={cx('text')}>
          Price: {product_price} | Quantity: {product_quantity}
        </Card.Text>
      </Card.Body>
      <Card.Footer className={cx('actions')}>
        {discountApplyEnable ? (
          !applied ? (
            <Button
              onClick={(e) => {
                setApplied(!applied);
                handleApply(e, product._id, product_name);
              }}
              className={cx('action-button')}
            >
              Apply
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                setApplied(!applied);
                handleUnapply(e, product._id, product_name);
              }}
              className={cx('action-button')}
            >
              Unapply
            </Button>
          )
        ) : (
          <div className={cx('actions')}>
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
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ShopProductCard;
