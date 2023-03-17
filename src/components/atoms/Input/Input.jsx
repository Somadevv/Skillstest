import React from 'react';
import styles from './input.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import showIcon from '../../../../public/images/icons/show.svg';
import hideIcon from '../../../../public/images/icons/hide.svg';
import { useState } from 'react';

const Input = ({ type, name, value, icon, className }) => {
  const classes = cn(styles.component, className);
  const [showPassword, setShowPassword] = useState(false);

  let passwordRef = React.createRef();

  const handlePasswordVisiblity = () => {
    setShowPassword(!showPassword);
    console.log('clicked');
    passwordRef.current.type = 'text';
    // Check current input type, toggle dependent on state
    if (passwordRef.current.type === 'password') {
      passwordRef.current.type = 'text';
    } else {
      passwordRef.current.type = 'password';
    }
  };

  return (
    <div className={classes}>
      <input
        value={value}
        name={name}
        type={type === 'password' && showPassword ? 'text' : type}
        ref={passwordRef}
      />
      {icon && (
        <Image
          className={styles.icon}
          src={showPassword ? showIcon : hideIcon}
          alt=""
          onClick={handlePasswordVisiblity}
          width={15}
          height={15}
        />
      )}
    </div>
  );
};

export default Input;
