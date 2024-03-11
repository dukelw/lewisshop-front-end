import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Pagination } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import 'tippy.js/dist/tippy.css';
import styles from './ProductContainer.module.scss';
import ProductCard from '../ProductCard';
import FilterForm from './FilterForm';
import { FilterIcon, SortIcon } from '~/components/Icons';
import { getAllProductNoLimit, getFilterProducts } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductContainer({ part, getProductsFunction = () => {}, isShopView = false }) {
  const DEFAULT_PAGE = 1;
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products.products.allProducts);
  const data = products?.metadata;
  const currentProducts = useSelector((state) => state?.products.allProducts.products);
  const numberOfProducts = currentProducts?.metadata.length;
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterMode, setIsFilterMode] = useState(false);

  const loadCurrentPage = (page) => {
    setCurrentPage(page);
    if (!isFilterMode) {
      getProductsFunction(page);
    } else {
      const filter = JSON.parse(localStorage.getItem('filter'));
      handleFilter(filter, page);
    }
  };

  console.log(numberOfProducts);

  const handleFilterHover = () => {
    setShowFilterForm(true);
  };

  const handleFilterBlur = () => {
    setShowFilterForm(false);
  };

  const handleFilter = (filter, page) => {
    setIsFilterMode(true);
    const LIMIT = 30;
    const filters = {
      $or: [],
      isPublished: true,
    };
    for (var type of filter['categories']) {
      filters['$or'].push({ product_type: type });
    }

    getFilterProducts(filters, LIMIT, page, dispatch);
    handleFilterBlur();
  };

  const handleReset = () => {
    getProductsFunction(DEFAULT_PAGE);
    setIsFilterMode(false);
  };

  useEffect(() => {
    getProductsFunction(DEFAULT_PAGE);
    getAllProductNoLimit(dispatch);
  }, []);

  return (
    <div className={cx('wrapper', isShopView ? 'mt-only' : '')}>
      <h1 className={cx('part')}>{part}</h1>
      <div className={cx('tools')}>
        {!isShopView && (
          <p className={cx('status')}>
            {currentPage} of {Math.round(numberOfProducts / 30) + 1} pages
          </p>
        )}
        {!isShopView && (
          <div className={cx('actions')}>
            {/* Filter */}
            <div className={cx('filter')} onMouseEnter={handleFilterHover} onMouseLeave={handleFilterBlur}>
              <p className={cx('query')}>Filter</p>
              <div className={cx('action-btn')}>
                <FilterIcon className={cx('query')} />
              </div>
              <FilterForm onSubmit={handleFilter} handleClear={handleReset} show={showFilterForm} />
            </div>
            {/* Sort */}
            <div className={cx('sort')}>
              <p className={cx('query')}>Sort by</p>
              <div className={cx('action-btn')}>
                <SortIcon className={cx('query')} />
              </div>
            </div>
          </div>
        )}
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
      {!isShopView && numberOfProducts / 30 + 1 > 2 && (
        <div className={cx('more')}>
          <Pagination size="lg">
            <Pagination.First onClick={() => loadCurrentPage(1)} linkClassName={cx('pagination-link')} />
            <Pagination.Prev onClick={() => loadCurrentPage(currentPage - 1)} linkClassName={cx('pagination-link')} />
            {/* 30 is the limit of API when render product */}
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
      )}
    </div>
  );
}

export default ProductContainer;
