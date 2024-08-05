import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import { searchProducts, searchShops } from '~/redux/apiRequest';
import ProductItem from '~/components/ProductItem';
import ShopItem from '~/components/ShopItem';

const cx = classNames.bind(styles);

function Search() {
  const currentProductSearchResult = useSelector((state) => state?.products.search.matchedProducts);
  const currentShopSearchResult = useSelector((state) => state?.shop.search.matchedShops);
  const dispatch = useDispatch();
  const productSearchResult = currentProductSearchResult?.metadata || [];
  const shopSearchResult = currentShopSearchResult?.metadata || [];
  const [searchValue, setSearchValue] = useState('');
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const inputRef = useRef();

  const handleClear = () => {
    inputRef.current.focus();
    setSearchValue('');
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  useEffect(() => {
    searchProducts(searchValue, dispatch, axios);
    searchShops(searchValue, dispatch, axios);
  }, [searchValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleDisplaySearch = (e) => {
    setSearchDisplay(!searchDisplay);
  };

  return (
    // Fix Tippy.js warning Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <div className={cx('search-toggle')} onClick={(e) => handleDisplaySearch(e)}>
        <SearchIcon display={!searchDisplay === false ? 'none' : 'block'} className={cx('search-toogle-btn')} />
      </div>
      {searchDisplay && (
        <HeadlessTippy
          interactive
          visible={showResult && productSearchResult?.length > 0}
          placement="bottom-end"
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex={-1} {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Product</h4>
                {productSearchResult?.map((result) => {
                  return <ProductItem key={result._id} data={result}></ProductItem>;
                })}
                <h4 className={cx('search-title')}>Shop</h4>
                {shopSearchResult?.map((result) => {
                  return <ShopItem key={result._id} data={result}></ShopItem>;
                })}
              </PopperWrapper>
            </div>
          )}
          onClickOutside={handleHideResult}
        >
          <div className={cx('search')}>
            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
              <SearchIcon />
            </button>
            <input
              ref={inputRef}
              value={searchValue}
              type="text"
              placeholder="Search product..."
              onChange={handleChange}
              onFocus={() => setShowResult(true)}
            />
            {!!searchValue && (
              <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}
          </div>
        </HeadlessTippy>
      )}
    </div>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object,
};

export default Search;
