import { Container, Row, Col, Form } from 'react-bootstrap';
import className from 'classnames/bind';
import styles from './View.module.scss';

const cx = className.bind(styles);

function AccountView() {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <Form.Group className={cx('form-group')} controlId="discount_type">
            <Form.Label className={cx('form-label')}>Category</Form.Label>
            <Form.Control
              className={cx('form-control')}
              as="select"
              name="discount_type"
              // value={discountType}
              // onChange={handleDiscountType}
            >
              {/* <option value="">Select discount type</option> */}
              {/* <option value="fixed_amount">Fixed amount</option> */}
              {/* <option value="percentage">Percentage</option> */}
            </Form.Control>
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_name">
            <Form.Label className={cx('form-label')}>Name</Form.Label>
            <Form.Control
              // value={formData.discount_name}
              className={cx('form-control')}
              type="text"
              name="discount_name"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_description">
            <Form.Label className={cx('form-label')}>Description</Form.Label>
            <Form.Control
              // value={formData.discount_description}
              className={cx('form-control')}
              as="textarea"
              rows={3}
              name="discount_description"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_value">
            <Form.Label className={cx('form-label')}>Value</Form.Label>
            <Form.Control
              // value={formData.discount_value}
              className={cx('form-control')}
              type="text"
              name="discount_value"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_max_value">
            <Form.Label className={cx('form-label')}>Max value</Form.Label>
            <Form.Control
              // value={formData.discount_max_value}
              className={cx('form-control')}
              type="text"
              name="discount_max_value"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_code">
            <Form.Label className={cx('form-label')}>Code</Form.Label>
            <Form.Control
              // value={formData.discount_code}
              className={cx('form-control')}
              type="text"
              name="discount_code"
              // onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group className={cx('form-group')} controlId="discount_type">
            <Form.Label className={cx('form-label')}>Category</Form.Label>
            <Form.Control
              className={cx('form-control')}
              as="select"
              name="discount_type"
              // value={discountType}
              // onChange={handleDiscountType}
            >
              {/* <option value="">Select discount type</option> */}
              {/* <option value="fixed_amount">Fixed amount</option> */}
              {/* <option value="percentage">Percentage</option> */}
            </Form.Control>
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_name">
            <Form.Label className={cx('form-label')}>Name</Form.Label>
            <Form.Control
              // value={formData.discount_name}
              className={cx('form-control')}
              type="text"
              name="discount_name"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_description">
            <Form.Label className={cx('form-label')}>Description</Form.Label>
            <Form.Control
              // value={formData.discount_description}
              className={cx('form-control')}
              as="textarea"
              rows={3}
              name="discount_description"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_value">
            <Form.Label className={cx('form-label')}>Value</Form.Label>
            <Form.Control
              // value={formData.discount_value}
              className={cx('form-control')}
              type="text"
              name="discount_value"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_max_value">
            <Form.Label className={cx('form-label')}>Max value</Form.Label>
            <Form.Control
              // value={formData.discount_max_value}
              className={cx('form-control')}
              type="text"
              name="discount_max_value"
              // onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className={cx('form-group')} controlId="discount_code">
            <Form.Label className={cx('form-label')}>Code</Form.Label>
            <Form.Control
              // value={formData.discount_code}
              className={cx('form-control')}
              type="text"
              name="discount_code"
              // onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <div className={cx('user')}>
            <img src="" alt="Avatar"></img>
            <div className={cx('infor')}>
              <p className={cx('name')}></p>
              <p className={cx('email')}></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountView;
