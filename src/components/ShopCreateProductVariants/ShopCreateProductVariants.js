import React, { useEffect, useRef, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import classNames from 'classnames/bind';
import styles from './ShopCreateProductVariants.module.scss';
import Button from '../Button';
import { createNewVariant, uploadImage, getAllVariantsOfProduct } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import { BackwardIcon } from '../Icons';

const cx = classNames.bind(styles);

const ShopCreateProductVariants = () => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const variants = useSelector((state) => state?.variant.get?.allVariants)?.metadata;
  const shopID = shop?.metadata.shop._id;
  const productID = localStorage.getItem('productVarianceID');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(shop);
  const [file, setFile] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  useEffect(() => {
    getAllVariantsOfProduct(productID, dispatch);
  }, []);

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
        image: cloudinaryImage,
      };

      await createNewVariant(
        shop?.metadata.tokens.accessToken,
        shop?.metadata.shop._id,
        convertedFormData,
        dispatch,
        navigate,
        axiosJWT,
      );

      getAllVariantsOfProduct(productID, dispatch);
    } else {
      navigate('/shop/signin');
    }

    // Reset form
    setFormData(initialState);

    // Focus name
    nameRef.current.focus();
  };

  const nameRef = useRef(null);
  const variantBasicData = ['shop_id', 'product_id', 'image', 'size', 'color', 'quantity'];
  const initialState = {
    shop_id: shopID,
    product_id: productID,
    image: '',
    size: '',
    color: '',
    quantity: 0,
  };
  const [formData, setFormData] = useState(initialState);

  const onDrop = async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    const imageUrl = URL.createObjectURL(uploadedFile);
    setUploadedImageUrl(imageUrl);

    // Cập nhật state formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageUrl,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (!variantBasicData.includes(name)) {
      formData.attributes[name] = value;
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Create new variant</h1>
      <Form className={cx('form')} onSubmit={handleSubmit}>
        <Row>
          <Col md={2}>
            <Link className={cx('redirect')} to={'/shop/create/product-variants'}>
              <p className={cx('backward')}>
                <BackwardIcon padding={6} /> Back
              </p>
            </Link>
            <Form.Label className={cx('form-label')}>Current Variance</Form.Label>
            {variants.length > 0 ? (
              variants?.map((variant, index) => (
                <Link to={`/shop/variance/edit/${variant._id}`} key={index} className={cx('variance_container')}>
                  <img className={cx('variance_image')} src={variant.variant_image} alt="Variance" />
                  <div className={cx('variance_detail')}>
                    <span className={cx('variance_text')}>Size: {variant.variant_size}</span>
                    <span className={cx('variance_text')}>Color: {variant.variant_color}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>
                <b>There is no variance</b>
              </p>
            )}
          </Col>
          <Col md={1}></Col>
          <Col md={2}>
            <Form.Group className={cx('avatar-zone')}>
              <Form.Label className={cx('form-label')}>Image Preview</Form.Label>
              <div className={cx('thumb-preview')}>
                {uploadedImageUrl && <img className={cx('avatar')} src={uploadedImageUrl} alt="Variant Thumb"></img>}
              </div>
              <Form.Group className={cx('upload')} controlId="avatar">
                <div className={cx('btn-container')} {...getRootProps()} style={{ cursor: 'pointer' }}>
                  <input {...getInputProps()} />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className={cx('btn')}
                    primary
                    rounded
                  >
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
          <Col md={1}></Col>
          <Col md={6}>
            <Form.Group className={cx('form-group')} controlId="size">
              <Form.Label className={cx('form-label')}>Size</Form.Label>
              <Form.Control
                ref={nameRef}
                value={formData.size}
                className={cx('form-control')}
                type="text"
                name="size"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="color">
              <Form.Label className={cx('form-label')}>Color</Form.Label>
              <Form.Control
                value={formData.color}
                className={cx('form-control')}
                as="textarea"
                rows={3}
                name="color"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="quantity">
              <Form.Label className={cx('form-label')}>Quantity</Form.Label>
              <Form.Control
                value={formData.quantity}
                className={cx('form-control')}
                type="text"
                name="quantity"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <Button small className={cx('submit-btn')} primary onClick={handleSubmit}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ShopCreateProductVariants;
