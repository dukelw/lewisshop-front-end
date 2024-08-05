import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Pagination } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './ProductVariance.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import FilterForm from './FilterForm';
import { FilterIcon, SortIcon } from '~/components/Icons';
import { getAllProductNoLimit, getFilterProducts } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardVariance from '../ProductCardVariance';

const cx = classNames.bind(styles);

function ProductVariance({ part, getProductsFunction = () => {}, isShopView = false }) {
  const DEFAULT_PAGE = 1;
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products.products.allProducts);
  const data = products?.metadata;
  const currentProducts = useSelector((state) => state?.products.allProducts.products);
  const numberOfProducts = currentProducts?.metadata.length;
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [isSortMode, setIsSortMode] = useState(false);
  const [tippyVisible, setTippyVisible] = useState(false);
  const [sortBy, setSortBy] = useState('time');

  const handleSortHover = () => {
    setTippyVisible(true);
    setIsSortMode(true);
  };

  const handleOptionClick = (option) => {
    setTippyVisible(false);
    loadCurrentPage(1, option);
    setSortBy(option);
  };

  const handleFilterHover = () => {
    setTippyVisible(false);
    setShowFilterForm(true);
  };

  const handleFilterBlur = () => {
    setShowFilterForm(false);
  };

  const loadCurrentPage = (page, sort) => {
    setCurrentPage(page);
    if (!isFilterMode && !isSortMode) {
      // Default mode
      getProductsFunction(page);
    } else if (isFilterMode) {
      // Filter mode
      const filter = JSON.parse(localStorage.getItem('filter'));
      handleFilter(filter, page, sort);
    } else {
      // Sort mode
      getProductsFunction(page, sort);
    }
  };

  const handleFilter = (filter, page, sort) => {
    const LIMIT = 30;
    setIsFilterMode(true);
    let filters = {
      isPublished: true,
    };

    // Filter options
    if (filter && typeof filter === 'object') {
      filters = {
        $or: [],
        product_price: {},
        isPublished: true,
      };

      for (var type of filter['categories']) {
        filters['$or'].push({ product_type: type });
      }

      if (filter['price']) filters['product_price'] = { $lte: parseInt(filter['price']) };
    }

    getFilterProducts(filters, LIMIT, page, sort, dispatch);
    handleFilterBlur();
  };

  const handleReset = () => {
    getProductsFunction(DEFAULT_PAGE);
    setIsFilterMode(false);
    localStorage.removeItem('filters');
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
            <HeadlessTippy
              placement="bottom-end"
              interactive={true}
              visible={tippyVisible}
              onClickOutside={() => setTippyVisible(false)}
              render={() => (
                <div>
                  <PopperWrapper>
                    <p className={cx('option')} onClick={() => handleOptionClick('asc')}>
                      Name (A to Z)
                    </p>
                    <p className={cx('option')} onClick={() => handleOptionClick('desc')}>
                      Name (Z to A)
                    </p>
                    <p className={cx('option')} onClick={() => handleOptionClick('low')}>
                      Price (Low to high)
                    </p>
                    <p className={cx('option')} onClick={() => handleOptionClick('high')}>
                      Price (High to low)
                    </p>
                    <p className={cx('option')} onClick={() => handleOptionClick('time')}>
                      Time (Latest)
                    </p>
                  </PopperWrapper>
                </div>
              )}
            >
              <div className={cx('sort')} onMouseEnter={handleSortHover}>
                <p className={cx('query')}>Sort by</p>
                <div className={cx('action-btn')}>
                  <SortIcon className={cx('query')} />
                </div>
              </div>
            </HeadlessTippy>
          </div>
        )}
      </div>
      <Container>
        <Row>
          {data?.map((item, index) => {
            return (
              <Col key={index} sm={6} xl={2} lg={2}>
                <ProductCardVariance data={item}></ProductCardVariance>
              </Col>
            );
          })}
        </Row>
      </Container>
      {!isShopView && numberOfProducts / 30 + 1 > 2 && (
        <div className={cx('more')}>
          <Pagination size="lg">
            <Pagination.First onClick={() => loadCurrentPage(1, sortBy)} linkClassName={cx('pagination-link')} />
            <Pagination.Prev
              onClick={() => loadCurrentPage(currentPage - 1, sortBy)}
              linkClassName={cx('pagination-link')}
            />
            {/* 30 is the limit of API when render product */}
            {Array.from({ length: numberOfProducts / 30 + 1 }).map((_, index) => (
              <Pagination.Item
                linkClassName={cx('pagination-link')}
                key={index}
                active={index + 1 === currentPage}
                onClick={() => loadCurrentPage(index + 1, sortBy)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => loadCurrentPage(currentPage + 1, sortBy)}
              linkClassName={cx('pagination-link')}
            />
            <Pagination.Last
              onClick={() => loadCurrentPage(Math.floor(numberOfProducts / 30) + 1, sortBy)}
              linkClassName={cx('pagination-link')}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ProductVariance;
