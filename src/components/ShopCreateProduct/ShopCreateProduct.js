import React, { useRef, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import classNames from 'classnames/bind';
import styles from './ShopCreateProduct.module.scss';
import Button from '../Button';
import { createNewProduct, uploadImage } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

const ShopCreateProduct = () => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const shopID = shop?.metadata.shop._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(shop);
  const [file, setFile] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (shop) {
      // Progress when start
      setUploadProgress(true);

      // Upload image to Cloudinary
      const image = await uploadImage(file, `lewishop/shop/product/${shopID}`, dispatch, axios);
      const cloudinaryImage = image?.metadata.img_url;

      // Progress when end
      setUploadProgress(false);

      const convertedFormData = {
        ...formData,
        product_thumb: cloudinaryImage,
      };

      createNewProduct(
        shop?.metadata.tokens.accessToken,
        shop?.metadata.shop._id,
        convertedFormData,
        dispatch,
        navigate,
        axiosJWT,
      );
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
    product_name: '',
    product_thumb: '',
    product_description: '',
    product_price: 10000,
    product_quantity: 1,
    product_type: '',
    product_attributes: {},
  };
  const [productCategory, setProductCategory] = useState('');
  const [formData, setFormData] = useState(initialState);

  const onDrop = async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    const imageUrl = URL.createObjectURL(uploadedFile);
    setUploadedImageUrl(imageUrl);

    // Cập nhật state formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      product_thumb: imageUrl,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
      formData.product_attributes[name] = value;
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
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Create new product</h1>
      <Form className={cx('form')} onSubmit={handleSubmit}>
        <Row>
          <Col md={2}>
            <Form.Group className={cx('avatar-zone')}>
              <div className={cx('thumb-preview')}>
                {uploadedImageUrl && <img className={cx('avatar')} src={uploadedImageUrl} alt="Product Thumb"></img>}
              </div>
              <Form.Group className={cx('upload')} controlId="avatar">
                <div className={cx('btn-container')} {...getRootProps()} style={{ cursor: 'pointer' }}>
                  <input {...getInputProps()} />
                  <Button className={cx('btn')} primary rounded>
                    Upload
                  </Button>
                </div>
              </Form.Group>
              {uploadProgress && (
                <LinearProgress
                  style={{ marginTop: '20px', width: '100%', backgroundColor: '#f48fb1' }}
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      // The static part is backgroundColor below
                      backgroundColor: '#f50057', // The running part
                    },
                  }}
                />
              )}
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className={cx('form-group')} controlId="productCategory">
              <Form.Label className={cx('form-label')}>Category</Form.Label>
              <Form.Control
                className={cx('form-control')}
                as="select"
                name="productCategory"
                value={productCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                <option value="Electronic">Electronic</option>
                <option value="Clothes">Clothes</option>
                <option value="Furniture">Furniture</option>
              </Form.Control>
            </Form.Group>
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
          <Col md={5}>
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
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <Button className={cx('submit-btn')} primary onClick={handleSubmit}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ShopCreateProduct;
