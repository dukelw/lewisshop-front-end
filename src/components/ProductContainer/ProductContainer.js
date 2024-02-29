import classNames from 'classnames/bind';
import React, { useState } from 'react';
import 'tippy.js/dist/tippy.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Pagination } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import 'tippy.js/dist/tippy.css';
import styles from './ProductContainer.module.scss';
import ProductCard from '../ProductCard';
import { FilterIcon, SortIcon } from '~/components/Icons';
import Search from '~/layouts/components/Search';
import { getAllProductNoLimit } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductContainer({ data, part, handlePageClick, currentPage }) {
  const dispatch = useDispatch();
  const currentProducts = useSelector((state) => state?.products.allProducts.products);
  const numberOfProducts = currentProducts.metadata.length;
  useState(() => {
    getAllProductNoLimit(dispatch);
  }, []);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('part')}>{part}</h1>
      <div className={cx('tools')}>
        <p className={cx('status')}>1 of 10 pages</p>
        <div className={cx('actions')}>
          {/* Filter */}
          <div className={cx('filter')}>
            <p>Filter</p>
            <div className={cx('action-btn')}>
              <FilterIcon />
            </div>
          </div>
          {/* Sort */}
          <div className={cx('sort')}>
            <p>Sort by</p>
            <div className={cx('action-btn')}>
              <SortIcon />
            </div>
            <Search />
          </div>
          {/* Search */}
        </div>
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
      <div className={cx('more')}>
        <Pagination size="lg">
          <Pagination.First onClick={() => handlePageClick(1)} linkClassName={cx('pagination-link')} />
          <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} linkClassName={cx('pagination-link')} />
          {/* 30 is the limit of API when render product */}
          {Array.from({ length: numberOfProducts / 30 + 1 }).map((_, index) => (
            <Pagination.Item
              linkClassName={cx('pagination-link')}
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} linkClassName={cx('pagination-link')} />
          <Pagination.Last
            onClick={() => handlePageClick(Math.floor(numberOfProducts / 30) + 1)}
            linkClassName={cx('pagination-link')}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default ProductContainer;
