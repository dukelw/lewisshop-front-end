import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import styles from './Sidebar.module.scss';
import { getFilterProducts } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    $or: [],
    product_price: {},
    isPublished: true,
  });
  const handleCheckboxChange = (category, item) => {
    const LIMIT = 30,
      PAGE = 1,
      SORT = 'ctime';
    let isChecked = false;
    switch (category) {
      case 'Category':
        isChecked = filter.$or.some((element) => element.product_type === item);
        if (isChecked) {
          filter.$or = filter.$or.filter((element) => element.product_type !== item);
        } else {
          filter.$or.push({ product_type: item });
        }
        break;
      case 'Price':
        isChecked = filter.product_price.$lte === item;
        if (isChecked) {
          filter.product_price = filter.product_price = {};
        } else {
          filter.product_price = { $lte: item === 'All price' ? 100000000000 : item };
        }
        break;
      default:
        break;
    }
    getFilterProducts(filter, LIMIT, PAGE, SORT, dispatch);
  };

  const categories = [
    {
      name: 'Category',
      value: ['Clothes', 'Electronic', 'Furniture'],
    },
    {
      name: 'Price',
      value: ['50000', '100000', '200000', '500000', 'All price'],
    },
  ];

  return (
    <div className={cx('wrapper')}>
      {categories.map((category, index) => (
        <ul className={cx('category')} key={index}>
          <span className={cx('list')}>{category.name}</span>
          {category.value.map((name) => (
            <li className={cx('item')} key={name}>
              {' '}
              <input
                className={cx('input')}
                type={category.name !== 'Price' ? 'checkbox' : 'radio'}
                name="price"
                id={name}
                onChange={() => handleCheckboxChange(category.name, name)}
              />
              <label className={cx('label')} htmlFor={name}>
                {category.name !== 'Price' ? name : 'Up to ' + name}
              </label>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Sidebar;
