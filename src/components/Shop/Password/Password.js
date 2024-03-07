import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import className from 'classnames/bind';
import styles from './Password.module.scss';
import { createAxios } from '~/createAxios';
import Button from '~/components/Button';
import { EyeIcon, EyeSlashIcon } from '~/components/Icons';
import { addToast, changeShopPassword, findShopByID } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);

function Password() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const shopID = currentShop?.metadata.shop?._id;
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopInfo = useSelector((state) => state?.shop.shop?.foundShop);
  const shop = shopInfo?.metadata;
  const axiosJWT = createAxios(currentShop);
  const [displayCurrentPassword, setDisplayCurrentPassword] = useState(false);
  const [displayNewPassword, setDisplayNewPassword] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    findShopByID(shopID, dispatch, axiosJWT);
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSeeNewPassword = () => {
    setDisplayNewPassword(true);
  };

  const handleHideNewPassword = () => {
    setDisplayNewPassword(false);
  };

  const handleSeeConfirmPassword = () => {
    setDisplayConfirmPassword(true);
  };

  const handleHideConfirmPassword = () => {
    setDisplayConfirmPassword(false);
  };

  const handleSeeCurrentPassword = () => {
    setDisplayCurrentPassword(true);
  };

  const handleHideCurrentPassword = () => {
    setDisplayCurrentPassword(false);
  };

  const initialState = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
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

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      addToast({ message: 'Confirm password mismatched! Please re-confirm', type: 'error', show: true }, dispatch);
    } else {
      const data = {
        email: shop.email,
        password: formData.currentPassword,
        new_password: formData.newPassword,
      };
      changeShopPassword(accessToken, shopID, data, dispatch, navigate, axiosJWT);
    }
  };

  return (
    <Container className={cx('wrapper')}>
      <div className={cx('mode')}>
        <h1 className={cx('header')}>Your password</h1>
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
        <Col md={12}>
          <Form.Group className={cx('form-group')} controlId="password">
            <Form.Label className={cx('form-label')}>Password</Form.Label>
            <Form.Control
              disabled={true}
              value={'xxxxxx'}
              className={cx('form-control')}
            type="password"
              name="password"
            />
          </Form.Group>
          {editMode && (
            <Form.Group className={cx('form-group')} controlId="currentPassword">
              <Form.Label className={cx('form-label')}>Current Password</Form.Label>
              <Form.Control
                disabled={!editMode}
                value={formData.currentPassword}
                className={cx('form-control')}
                type={displayCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                onChange={handleInputChange}
              />
              {!displayCurrentPassword && (
                <EyeIcon
                  style={{ position: 'absolute', right: '20px', top: '44%' }}
                  onClick={handleSeeCurrentPassword}
                />
              )}
              {displayCurrentPassword && (
                <EyeSlashIcon
                  style={{ position: 'absolute', right: '20px', top: '44%' }}
                  onClick={handleHideCurrentPassword}
                />
              )}
            </Form.Group>
          )}
          {editMode && (
            <Form.Group className={cx('form-group')} controlId="newPassword">
              <Form.Label className={cx('form-label')}>New Password</Form.Label>
              <Form.Control
                disabled={!editMode}
                value={formData.newPassword}
                className={cx('form-control')}
                type={displayNewPassword ? 'text' : 'password'}
                name="newPassword"
                onChange={handleInputChange}
              />
              {!displayNewPassword && (
                <EyeIcon style={{ position: 'absolute', right: '20px', top: '44%' }} onClick={handleSeeNewPassword} />
              )}
              {displayNewPassword && (
                <EyeSlashIcon
                  style={{ position: 'absolute', right: '20px', top: '44%' }}
                  onClick={handleHideNewPassword}
                />
              )}
            </Form.Group>
          )}
          {editMode && (
            <Form.Group className={cx('form-group')} controlId="confirmPassword">
              <Form.Label className={cx('form-label')}>Confirm Password</Form.Label>
              <Form.Control
                disabled={!editMode}
                value={formData.confirmPassword}
                className={cx('form-control')}
                type={displayConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={handleInputChange}
              />
              {!displayConfirmPassword && (
                <EyeIcon
                  style={{ position: 'absolute', right: '20px', top: '44%' }}
                  onClick={handleSeeConfirmPassword}
                />
              )}
              {displayConfirmPassword && (
                <EyeSlashIcon
                  style={{ position: 'absolute', right: '20px', top: '44%' }}
                  onClick={handleHideConfirmPassword}
                />
              )}
            </Form.Group>
          )}
          <Row>
            <Col className={cx('save')} md={12}>
              <Button
                disabled={!editMode}
                onClick={handleChangePassword}
                className={cx('save-btn')}
                primary
                large
                rounded
              >
                Save changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Password;
