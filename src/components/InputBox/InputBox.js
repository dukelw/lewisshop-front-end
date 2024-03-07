import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './InputBox.module.scss';
import { EyeSlashIcon, EyeIcon, ErrorIcon } from '../Icons';

const cx = classNames.bind(styles);

function InputBox({
  placeholder = 'Input',
  value,
  setValue = () => {},
  show = true,
  onKeyDown = () => {},
  submiting = false,
  errorMessage = 'This field is required',
  conflict = false,
  handleCheckEmail = null,
}) {
  const [showValue, setShowValue] = useState(show);
  return (
    <div className={cx('input-box')}>
      <input
        type={showValue ? 'text' : 'password'}
        className={cx(
          'input-field',
          (value === '' && submiting) || conflict || (handleCheckEmail && !handleCheckEmail(value) && submiting)
            ? 'error'
            : '',
        )}
        placeholder={placeholder}
        autoComplete="off"
        required
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      {value && (
        <div className={cx('eye-icon')} onClick={() => setShowValue(!showValue)}>
          {showValue ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
      )}
      <div
        className={cx(
          'error-container',
          (value === '' && submiting) || conflict || (handleCheckEmail && !handleCheckEmail(value) && submiting)
            ? 'on'
            : '',
        )}
      >
        <ErrorIcon />
        <span className={cx('error')}>{value === '' ? errorMessage : 'Email is not valid'}</span>
      </div>
    </div>
  );
}

export default InputBox;
