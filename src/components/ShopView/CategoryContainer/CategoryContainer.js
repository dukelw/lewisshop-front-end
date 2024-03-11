import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Pagination } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import 'tippy.js/dist/tippy.css';
import FilterForm from '~/components/ProductContainer/FilterForm';
import styles from './CategoryContainer.module.scss';
import ProductCard from '~/components/ProductCard';
import { FilterIcon } from '~/components/Icons';
import { getAllProductNoLimit, getFilterProducts } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CategoryContainer({ part, data }) {
  const DEFAULT_PAGE = 1;
  const dispatch = useDispatch();
  const currentProducts = useSelector((state) => state?.products.allProducts.products);
  const numberOfProducts = currentProducts?.metadata.length;

  return (
    <div className={cx('wrapper', 'mt-only')}>
      <h1 className={cx('part')}>{part}</h1>
      <div className={cx('tools')}>
        <p className={cx('status')}>{/* {currentPage} of {Math.round(numberOfProducts / 30) + 1} pages */}</p>
      </div>
      <Container>
        <Row>
          {data?.map((item, index) => {
            return (
              <Col key={index} sm={6} xl={2} lg={2}>
                <ProductCard data={item}></ProductCard>
              </Col>
            );
          })}
        </Row>
      </Container>
      {/* {numberOfProducts / 30 + 1 > 2 && (
        <div className={cx('more')}>
          <Pagination size="lg">
            <Pagination.First onClick={() => loadCurrentPage(1)} linkClassName={cx('pagination-link')} />
            <Pagination.Prev onClick={() => loadCurrentPage(currentPage - 1)} linkClassName={cx('pagination-link')} />
            30 is the limit of API when render product
            {Array.from({ length: numberOfProducts / 30 + 1 }).map((_, index) => (
              <Pagination.Item
                linkClassName={cx('pagination-link')}
                key={index}
                active={index + 1 === currentPage}
                onClick={() => loadCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => loadCurrentPage(currentPage + 1)} linkClassName={cx('pagination-link')} />
            <Pagination.Last
              onClick={() => loadCurrentPage(Math.floor(numberOfProducts / 30) + 1)}
              linkClassName={cx('pagination-link')}
            />
          </Pagination>
        </div>
      )} */}
    </div>
  );
}

export default CategoryContainer;
