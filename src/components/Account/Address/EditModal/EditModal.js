import React, { useState, useRef, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './EditModal.module.scss';
import Button from '~/components/Button';
import { updateUserAddress } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

const cx = classNames.bind(styles);

function EditModal({ children, data, index }) {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isDefault, setIsDefault] = useState(data.default);

  const [formData, setFormData] = useState({
    name: data.name,
    phone: data.phone,
    address: data.address,
    note: data.note,
    default: data.default,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDefault = () => {
    setIsDefault(!isDefault);
    setFormData({ ...formData, default: !isDefault });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      address: formData,
      index,
    };
    updateUserAddress(accessToken, userID, data, dispatch, axiosJWT);
    handleClose();
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => setShow(true) })}

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName={cx('wrapper')}
        contentClassName={cx('inner')}
      >
        <Modal.Header className={cx('heading')} closeButton>
          <Modal.Title className={cx('header')} id="example-custom-modal-styling-title">
            Edit Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={12}>
                <Form.Group className={cx('form-group')} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={formData.name}
                    className={cx('form-control')}
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className={cx('form-group')} controlId="phone">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control
                    value={formData.phone}
                    className={cx('form-control')}
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className={cx('form-group')} controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={formData.address}
                    className={cx('form-control')}
                    type="address"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className={cx('form-group')} controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    value={formData.note}
                    className={cx('form-control')}
                    type="note"
                    name="note"
                    placeholder="Note"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDefault}
                      onChange={handleDefault}
                      sx={{
                        '& .MuiSwitch-switchBase': { color: '#fff !important' },
                        '& .Mui-checked': { color: '#111010 !important' },
                        '& .Mui-checked + .MuiSwitch-track': { backgroundColor: '#979797 !important' },
                      }}
                    />
                  }
                  label={
                    <span style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'ProximaNova' }}>Default</span>
                  }
                />
              </Col>
              <Col className={cx('submit')} md={6}>
                <Button onClick={handleSubmit} primary>
                  Save changes
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
