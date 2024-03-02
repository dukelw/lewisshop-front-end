import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import className from 'classnames/bind';
import { useDropzone } from 'react-dropzone';
import styles from './Update.module.scss';
import { createAxios } from '~/createAxios';
import Button from '~/components/Button';

const cx = className.bind(styles);

function AccountUpdate() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const user = currentUser?.metadata.user;
  const axiosJWT = createAxios(currentUser);
  const [file, setFile] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(user.thumb || null);

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    // Upload image to server (if needed)
    // Here you can upload the image file to your server and get the URL
    // For demonstration purposes, I'll set the URL to a temporary value
    const imageUrl = URL.createObjectURL(uploadedFile);
    setUploadedImageUrl(imageUrl);

    // Cập nhật state formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumb: imageUrl,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const initialState = {
    name: user.name,
    email: user.email,
    thumb: user.thumb,
    bank_account_number: user.bank_account_number,
    address: user.address,
    phone_number: user.phone_number,
    gender: user.gender,
    day: '1',
    month: '1',
    year: '2012',
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

  useEffect(() => {
    console.log('Form data: ', formData);
  }, [formData]);

  return (
    <Container className={cx('wrapper')}>
      <Row>
        
      </Row>
      <Row>
        <Col md={10}>
          <Form.Group className={cx('form-group')} controlId="name">
            <Form.Label className={cx('form-label')}>Name</Form.Label>
            <Form.Control
              disabled={true}
              value={formData.name}
              className={cx('form-control')}
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="email">
            <Form.Label className={cx('form-label')}>Email</Form.Label>
            <Form.Control
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
              value={formData.phone_number}
              className={cx('form-control')}
              type="text"
              name="phone_number"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={cx('form-label')}>Gender</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  value="male"
                  label="Male"
                  name="gender"
                  type={type}
                  id={`inline-${type}-1`}
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  value="female"
                  label="Female"
                  name="gender"
                  type={type}
                  id={`inline-${type}-2`}
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  value="other"
                  label="Other"
                  name="gender"
                  type={type}
                  id={`inline-${type}-3`}
                  checked={formData.gender === 'other'}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Day</Form.Label>
                <Form.Control
                  className={cx('form-control')}
                  as="select"
                  name="day"
                  value={formData.day}
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
                  className={cx('form-control')}
                  as="select"
                  name="month"
                  value={formData.month}
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
              <Button className={cx('save-btn')} primary large rounded>
                Save changes
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={2} className={cx('avatar-zone')}>
          <div className={cx('user')}>
            <img className={cx('avatar')} src={uploadedImageUrl || user.thumb} alt="Avatar"></img>
          </div>
          <Form.Group className={cx('upload')} controlId="avatar">
            <div {...getRootProps()} style={{ cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <Button primary rounded>
                Upload
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountUpdate;
