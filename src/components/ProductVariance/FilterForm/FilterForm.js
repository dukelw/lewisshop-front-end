import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './FilterForm.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function FilterForm({ onSubmit, handleClear, show = false }) {
  const allProducts = useSelector((state) => state?.products.products.allProducts);
  const products = allProducts?.metadata;
  const allCategories = {};
  for (const productId in products) {
    const product = products[productId];
    if (!allCategories[product.product_type]) {
      allCategories[product.product_type] = false;
    }
  }

  const [categories, setCategories] = useState(allCategories);

  const [price, setPrice] = useState();

  const handleRadioChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCheckboxChange = (e, setState) => {
    const { name, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    const PAGE = 1;
    e.preventDefault();
    const selectedCategories = Object.keys(categories).filter((key) => categories[key]);
    const data = { categories: selectedCategories, price };
    localStorage.setItem('filter', JSON.stringify(data));
    onSubmit(data, PAGE);
  };

  return (
    show && (
      <Form className={cx('form')}>
        <Container>
          <Row>
            <Col md={6}>
              <Col md={6}>
                <Form.Group controlId="formCategories">
                  <Form.Label className={cx('label')}>Categories</Form.Label>
                  <div>
                    {Object.entries(categories).map(([key, value]) => (
                      <Form.Check
                        key={key}
                        className={cx('checkbox')}
                        type="checkbox"
                        label={key}
                        name={key}
                        checked={value}
                        onChange={(e) => handleCheckboxChange(e, setCategories)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPrice">
                <Form.Label className={cx('label')}>Price</Form.Label>
                <div>
                  <Form.Check
                    className={cx('checkbox')}
                    type="radio"
                    label="<= 50000"
                    name="price"
                    value="50000"
                    checked={price === '50000'}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="radio"
                    label="<= 100000"
                    name="price"
                    value="100000"
                    checked={price === '100000'}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="radio"
                    label="<= 200000"
                    name="price"
                    value="200000"
                    checked={price === '200000'}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="radio"
                    label="<= 500000"
                    name="price"
                    value="500000"
                    checked={price === '500000'}
                    onChange={handleRadioChange}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="radio"
                    label="Other"
                    name="price"
                    value="1000000000000000000"
                    checked={price === '1000000000000000000'}
                    onChange={handleRadioChange}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <div className={cx('actions')}>
          <Button className={cx('button')} onClick={handleClear} primary>
            Clear
          </Button>
          <Button className={cx('button')} onClick={handleSubmit} primary>
            Oke
          </Button>
        </div>
      </Form>
    )
  );
}

export default FilterForm;
