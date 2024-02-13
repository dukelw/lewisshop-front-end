import React, { useRef, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ShopEditProduct.module.scss';
import Button from '../Button';
import { useEffect } from 'react';
import { editProduct } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

const ShopEditProduct = () => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const accessToken = shop?.metadata.tokens.accessToken;
  const shopID = shop?.metadata.shop._id;
  const { productID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(shop);

  const foundProduct = useSelector((state) => state.products.product?.foundProduct);
  const {
    product_description,
    product_name,
    product_price,
    product_quantity,
    product_thumb,
    product_type,
    product_attributes,
  } = foundProduct.metadata;

  useEffect(() => {
    // Update form data whenever foundProduct changes
    if (foundProduct) {
      setFormData({
        product_name: foundProduct.metadata.product_name,
        product_thumb: foundProduct.metadata.product_thumb,
        product_description: foundProduct.metadata.product_description,
        product_price: foundProduct.metadata.product_price,
        product_quantity: foundProduct.metadata.product_quantity,
        product_type: foundProduct.metadata.product_type,
        product_attributes: foundProduct.metadata.product_attributes,
      });
      setProductCategory(foundProduct.metadata.product_type);
    }
  }, [foundProduct]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (shop) {
      console.log(formData);
      editProduct(accessToken, shopID, productID, formData, dispatch, navigate, axiosJWT);
    } else {
      navigate('/shop/signin');
    }

    // Reset form
    setFormData(initialState);
    setProductCategory('');

    // Focus name
    nameRef.current.focus();
  };

  const nameRef = useRef(null);
  const productBasicData = [
    'product_name',
    'product_thumb',
    'product_description',
    'product_price',
    'product_quantity',
    'product_type',
    'product_attributes',
  ];
  const initialState = {
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_attributes,
  };
  const [productCategory, setProductCategory] = useState(product_type);
  const [formData, setFormData] = useState(initialState);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setProductCategory(category);
    setFormData({
      ...formData,
      product_type: category,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (!productBasicData.includes(name)) {
      product_attributes[name] = value;
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const renderCategoryFields = () => {
    switch (productCategory) {
      case 'Electronic':
        return (
          <>
            <Form.Group className={cx('form-group')} controlId="manufacturer">
              <Form.Label className={cx('form-label')}>Manufacturer</Form.Label>
              <Form.Control
                value={formData.product_attributes?.manufacturer}
                className={cx('form-control')}
                type="text"
                name="manufacturer"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="model">
              <Form.Label className={cx('form-label')}>Model</Form.Label>
              <Form.Control
                value={formData.product_attributes?.model}
                className={cx('form-control')}
                type="text"
                name="model"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="color">
              <Form.Label className={cx('form-label')}>Color</Form.Label>
              <Form.Control
                value={formData.product_attributes?.color}
                className={cx('form-control')}
                type="text"
                name="color"
                onChange={handleInputChange}
              />
            </Form.Group>
          </>
        );
      case 'Clothes':
        return (
          <>
            <Form.Group className={cx('form-group')} controlId="brand">
              <Form.Label className={cx('form-label')}>Brand</Form.Label>
              <Form.Control
                value={formData.product_attributes?.brand}
                className={cx('form-control')}
                type="text"
                name="brand"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="size">
              <Form.Label className={cx('form-label')}>Size</Form.Label>
              <Form.Control
                value={formData.product_attributes?.size}
                className={cx('form-control')}
                type="text"
                name="size"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="material">
              <Form.Label className={cx('form-label')}>Material</Form.Label>
              <Form.Control
                value={formData.product_attributes?.material}
                className={cx('form-control')}
                type="text"
                name="material"
                onChange={handleInputChange}
              />
            </Form.Group>
          </>
        );
      case 'Furniture':
        return (
          <>
            <Form.Group className={cx('form-group')} controlId="manufacturer">
              <Form.Label className={cx('form-label')}>Manufacturer</Form.Label>
              <Form.Control
                value={formData.product_attributes?.manufacturer}
                className={cx('form-control')}
                type="text"
                name="manufacturer"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="model">
              <Form.Label className={cx('form-label')}>Model</Form.Label>
              <Form.Control
                value={formData.product_attributes?.model}
                className={cx('form-control')}
                type="text"
                name="model"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="from">
              <Form.Label className={cx('form-label')}>From</Form.Label>
              <Form.Control
                value={formData.product_attributes?.from}
                className={cx('form-control')}
                type="text"
                name="from"
                onChange={handleInputChange}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className={cx('title')}>Create new product</h1>
      <Form className={cx('form')} onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group className={cx('form-group')} controlId="productCategory">
              <Form.Label className={cx('form-label')}>Category</Form.Label>
              <Form.Control
                className={cx('form-control')}
                as="select"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                <option value="Electronic">Electronic</option>
                <option value="Clothes">Clothes</option>
                <option value="Furniture">Furniture</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className={cx('form-group')} controlId="product_name">
              <Form.Label className={cx('form-label')}>Name</Form.Label>
              <Form.Control
                ref={nameRef}
                value={formData.product_name}
                className={cx('form-control')}
                type="text"
                name="product_name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="product_description">
              <Form.Label className={cx('form-label')}>Description</Form.Label>
              <Form.Control
                value={formData.product_description}
                className={cx('form-control')}
                as="textarea"
                rows={3}
                name="product_description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="product_quantity">
              <Form.Label className={cx('form-label')}>Quantity</Form.Label>
              <Form.Control
                value={formData.product_quantity}
                className={cx('form-control')}
                type="text"
                name="product_quantity"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={cx('form-group')} controlId="product_thumb">
              <Form.Label className={cx('form-label')}>Thumbnail</Form.Label>
              <Form.Control
                value={formData.product_thumb}
                className={cx('form-control')}
                type="text"
                name="product_thumb"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="product_price">
              <Form.Label className={cx('form-label')}>Price</Form.Label>
              <Form.Control
                value={formData.product_price}
                className={cx('form-control')}
                type="text"
                name="product_price"
                onChange={handleInputChange}
              />
            </Form.Group>
            {renderCategoryFields()}
          </Col>
        </Row>
        <Button className={cx('submit-btn')} primary onClick={handleSubmit}>
          Edit
        </Button>
      </Form>
    </div>
  );
};

export default ShopEditProduct;
