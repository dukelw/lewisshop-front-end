import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './InputBox.module.scss';
import { EyeSlashIcon, EyeIcon } from '../Icons';

const cx = classNames.bind(styles);

function InputBox({ placeholder = 'Input', value, setValue = () => {}, show = true }) {
  const [showValue, setShowValue] = useState(show);
  return (
    <div className={cx('input-box')}>
      <input
        type={showValue ? 'text' : 'password'}
        className={cx('input-field')}
        placeholder={placeholder}
        autoComplete="off"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <div className={cx('eye-icon')} onClick={() => setShowValue(!showValue)}>
          {showValue ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
      )}
    </div>
  );
}

export default InputBox;
