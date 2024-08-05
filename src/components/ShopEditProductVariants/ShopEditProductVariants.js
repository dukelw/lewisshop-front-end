import React, { useEffect, useRef, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import classNames from 'classnames/bind';
import { BackwardIcon } from '../Icons';
import styles from './ShopEditProductVariants.module.scss';
import Button from '../Button';
import { uploadImage, getAllVariantsOfProduct, findVariantByID, updateVariant } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

const ShopEditProductVariants = () => {
  const { variantID } = useParams();
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const variant = useSelector((state) => state?.variant.find?.variant)?.metadata;
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
    findVariantByID(variantID, dispatch);
  }, [variantID]);

  useEffect(() => {
    if (variant) {
      setFormData({
        variant_image: variant.variant_image,
        variant_size: variant.variant_size,
        variant_color: variant.variant_color,
        variant_quantity: variant.variant_remain_quantity,
      });
    }
  }, [variant]);

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
        variant_image: cloudinaryImage,
      };

      await updateVariant(
        shop?.metadata.tokens.accessToken,
        shop?.metadata.shop._id,
        variantID,
        convertedFormData,
        dispatch,
        axiosJWT,
      );
      console.log('Form data: ' + convertedFormData);

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
  const variantBasicData = ['variant_image', 'variant_size', 'variant_color', 'variant_remain_quantity'];
  const initialState = {
    variant_image: variant?.variant_image,
    variant_size: variant?.variant_size,
    variant_color: variant?.variant_color,
    variant_quantity: variant?.variant_remain_quantity,
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
      <h1 className={cx('title')}>Edit variant</h1>
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
                <Link
                  to={`/shop/variance/edit/${variant._id}`}
                  key={index}
                  className={cx('variance_container', variant._id === variantID ? 'current' : '')}
                >
                  <img className={cx('variance_image')} src={variant.variant_image} alt="Variance" />
                  <div className={cx('variance_detail')}>
                    <span className={cx('variance_text')}>Size: {variant.variant_size}</span>
                    <span className={cx('variance_text')}>Color: {variant.variant_color}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>There is no variance</p>
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
            <Form.Group className={cx('form-group')} controlId="variant_image">
              <Form.Label className={cx('form-label', 'mt-20')}>Current Image</Form.Label>
              <img className={cx('current_image')} src={variant?.variant_image} alt="Current" />
            </Form.Group>
          </Col>
          <Col md={1}></Col>
          <Col md={6}>
            <Form.Group className={cx('form-group')} controlId="variant_size">
              <Form.Label className={cx('form-label')}>Size</Form.Label>
              <Form.Control
                ref={nameRef}
                value={formData?.variant_size}
                className={cx('form-control')}
                type="text"
                name="variant_size"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="variant_color">
              <Form.Label className={cx('form-label')}>Color</Form.Label>
              <Form.Control
                value={formData?.variant_color}
                className={cx('form-control')}
                as="textarea"
                rows={3}
                name="variant_color"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="variant_remain_quantity">
              <Form.Label className={cx('form-label')}>Remain Quantity</Form.Label>
              <Form.Control
                value={formData?.variant_quantity}
                className={cx('form-control')}
                type="text"
                name="variant_remain_quantity"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <Button small className={cx('submit-btn')} primary onClick={handleSubmit}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ShopEditProductVariants;
