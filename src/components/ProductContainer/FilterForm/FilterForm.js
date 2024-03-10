import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './FilterForm.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function FilterForm({ onSubmit, handleClear, products, show = false }) {
  const allCategories = {};
  for (const productId in products) {
    const product = products[productId];
    if (!allCategories[product.product_type]) {
      allCategories[product.product_type] = false;
    }
  }

  const [categories, setCategories] = useState(allCategories);

  const [locations, setLocations] = useState({
    location1: false,
    location2: false,
    location3: false,
  });

  const [prices, setPrices] = useState({
    price1: false,
    price2: false,
    price3: false,
  });

  const handleCheckboxChange = (e, setState) => {
    const { name, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategories = Object.keys(categories).filter((key) => categories[key]);
    const selectedLocations = Object.keys(locations).filter((key) => locations[key]);
    const selectedPrices = Object.keys(prices).filter((key) => prices[key]);
    const data = { categories: selectedCategories, locations: selectedLocations, prices: selectedPrices };
    onSubmit(data);
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
              <Form.Group controlId="formLocations">
                <Form.Label className={cx('label')}>Locations</Form.Label>
                <div>
                  <Form.Check
                    className={cx('checkbox')}
                    type="checkbox"
                    label="Location 1"
                    name="location1"
                    checked={locations.location1}
                    onChange={(e) => handleCheckboxChange(e, setLocations)}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="checkbox"
                    label="Location 2"
                    name="location2"
                    checked={locations.location2}
                    onChange={(e) => handleCheckboxChange(e, setLocations)}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="checkbox"
                    label="Location 3"
                    name="location3"
                    checked={locations.location3}
                    onChange={(e) => handleCheckboxChange(e, setLocations)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPrices">
                <Form.Label className={cx('label')}>Prices</Form.Label>
                <div>
                  <Form.Check
                    className={cx('checkbox')}
                    type="checkbox"
                    label="Price 1"
                    name="price1"
                    checked={prices.price1}
                    onChange={(e) => handleCheckboxChange(e, setPrices)}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="checkbox"
                    label="Price 2"
                    name="price2"
                    checked={prices.price2}
                    onChange={(e) => handleCheckboxChange(e, setPrices)}
                  />
                  <Form.Check
                    className={cx('checkbox')}
                    type="checkbox"
                    label="Price 3"
                    name="price3"
                    checked={prices.price3}
                    onChange={(e) => handleCheckboxChange(e, setPrices)}
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
