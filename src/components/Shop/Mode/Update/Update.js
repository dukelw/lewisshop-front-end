import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import className from 'classnames/bind';
import { useDropzone } from 'react-dropzone';
import styles from './Update.module.scss';
import { createAxios } from '~/createAxios';
import Button from '~/components/Button';
import { findShopByID, uploadImage, updateShopInformation } from '~/redux/apiRequest';

const cx = className.bind(styles);

function Update() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const shopID = currentShop?.metadata.shop?._id;
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopInfo = useSelector((state) => state?.shop.shop?.foundShop);
  const shop = shopInfo?.metadata;
  const axiosJWT = createAxios(currentShop);
  const [file, setFile] = useState('');
  const [uploadProgress, setUploadProgress] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    findShopByID(shopID, dispatch, axiosJWT);
  }, []);

  useEffect(() => {
    if (editMode && nameRef.current) {
      nameRef.current.focus();
    }
  }, [editMode]);

  const nameRef = useRef(null);

  const toggleEditMode = () => {
    if (editMode) {
      nameRef.current.focus();
    }
    setEditMode(!editMode);
  };

  const [uploadedImageUrl, setUploadedImageUrl] = useState(shop?.thumb || null);

  const onDrop = async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    const imageUrl = URL.createObjectURL(uploadedFile);
    setUploadedImageUrl(imageUrl);

    // Cập nhật state formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumb: imageUrl,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const birthday = moment(shop?.birthday).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  const [year, month, day] = birthday.split(' ')[0].split('-');
  const initialState = {
    name: shop?.name,
    email: shop?.email,
    thumb: shop?.thumb,
    bank_account_number: shop?.bank_account_number,
    address: shop?.address,
    phone_number: shop?.phone_number,
    gender: shop?.gender,
    day,
    month,
    year,
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === 'gender' ? event.target.getAttribute('value') : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleChangeInfo = async () => {
    // Progress when start
    setUploadProgress(true);

    // Upload image to Cloudinary
    const image = await uploadImage(file, `lewishop/shop/${shopID}`, dispatch, axios);
    const cloudinaryImage = image?.metadata.img_url || shop?.thumb;

    // Progress when end
    setUploadProgress(false);

    const convertedFormData = {
      ...formData,
      birthday: `${formData.month}/${formData.day}/${formData.year}`,
      thumb: cloudinaryImage,
    };
    await updateShopInformation(accessToken, shop?._id, convertedFormData, dispatch, axiosJWT);
    setEditMode(false);
  };

  const handleDay = (event) => {
    const day = event.target.value;
    setFormData({
      ...formData,
      day: day,
    });
  };

  const handleMonth = (event) => {
    const month = event.target.value;
    setFormData({
      ...formData,
      month,
    });
  };

  const handleYear = (event) => {
    const year = event.target.value;
    setFormData({
      ...formData,
      year,
    });
  };

  return (
    <Container className={cx('wrapper')}>
      <div className={cx('mode')}>
        <h1 className={cx('header')}>Your information</h1>
        <FormControlLabel
          control={
            <Switch
              checked={editMode}
              onChange={toggleEditMode}
              sx={{
                '& .MuiSwitch-switchBase': { color: '#fff !important' },
                '& .Mui-checked': { color: '#111010 !important' },
                '& .Mui-checked + .MuiSwitch-track': { backgroundColor: '#979797 !important' },
              }}
            />
          }
          label={<span style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'ProximaNova' }}>Edit</span>}
        />
      </div>
      <Row>
        <Col md={10}>
          <Form.Group className={cx('form-group')} controlId="name">
            <Form.Label className={cx('form-label')}>Name</Form.Label>
            <Form.Control
              disabled={!editMode}
              value={formData.name}
              className={cx('form-control')}
              type="text"
              name="name"
              onChange={handleInputChange}
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="email">
            <Form.Label className={cx('form-label')}>Email</Form.Label>
            <Form.Control
              disabled={!editMode}
              value={formData.email}
              className={cx('form-control')}
              type="text"
              name="email"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="phone_number">
            <Form.Label className={cx('form-label')}>Phone number</Form.Label>
            <Form.Control
              disabled={!editMode}
              value={formData.phone_number}
              className={cx('form-control')}
              type="text"
              name="phone_number"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Day</Form.Label>
                <Form.Control
                  disabled={!editMode}
                  className={cx('form-control')}
                  as="select"
                  name="day"
                  value={Number(formData.day)}
                  onChange={handleDay}
                >
                  <option value=""></option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Month</Form.Label>
                <Form.Control
                  disabled={!editMode}
                  className={cx('form-control')}
                  as="select"
                  name="month"
                  value={Number(formData.month)}
                  onChange={handleMonth}
                >
                  <option value=""></option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  disabled={!editMode}
                  className={cx('form-control')}
                  as="select"
                  name="year"
                  value={formData.year}
                  onChange={handleYear}
                >
                  <option value=""></option>
                  {Array.from({ length: new Date().getFullYear() - 1900 }, (_, i) => new Date().getFullYear() - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ),
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className={cx('save')} md={12}>
              <Button onClick={handleChangeInfo} className={cx('save-btn')} primary large rounded>
                Save changes
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={2} className={cx('avatar-zone')}>
          <div className={cx('shop')}>
            <img className={cx('avatar')} src={uploadedImageUrl || shop?.thumb} alt="Avatar"></img>
          </div>
          <Form.Group className={cx('upload')} controlId="avatar">
            <div {...getRootProps()} style={{ cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <Button primary rounded>
                Upload
              </Button>
            </div>
          </Form.Group>
          {uploadProgress && (
            <LinearProgress
              style={{ marginTop: '20px', width: '80%', backgroundColor: '#f48fb1' }}
              sx={{
                '& .MuiLinearProgress-bar': {
                  // The static part is backgroundColor below
                  backgroundColor: '#f50057', // The running part
                },
              }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Update;
