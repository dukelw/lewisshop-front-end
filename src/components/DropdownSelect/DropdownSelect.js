import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Select from 'react-select';
import styles from './DropdownSelect.module.scss';

const cx = classNames.bind(styles);

const DropdownSelect = ({ choices, name }) => {
  const uppercaseName = name.toUpperCase();
  const [selected, setSelected] = useState(null);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  // eslint-disable-next-line
  const handleAddToCart = () => {
    // Handle adding to cart logic here
    console.log(`Selected ${name}: ${selected.value}`);
  };

  const options = choices.map((choice) => ({ value: choice, label: choice }));

  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')}>{uppercaseName}</label>
      <Select className={cx('select')} value={selected} onChange={handleChange} options={options} />
    </div>
  );
};

export default DropdownSelect;
