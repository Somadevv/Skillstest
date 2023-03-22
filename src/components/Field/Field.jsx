import React from 'react';
import styles from './Field.module.scss';
import cn from 'classnames';
import Button from '../Button/Button';
import { useState } from 'react';
import showIcon from '../../../public/images/icons/show.svg';
import hideIcon from '../../../public/images/icons/hide.svg';
import Image from 'next/image';

const FormField = ({
  requiresIcon,
  setIconState,
  iconState,
  field,
  enableButton,
  buttonOnClick,
  buttonText,
  buttonType,
  buttonDisabled,
  labelFor,
  labelText,
  className,
}) => {
  const classes = cn(
    enableButton ? styles.component_split : styles.component,
    className
  );
  const [showPassword, setShowPassword] = useState(false);

  let passwordRef = React.createRef();

  const handlePasswordVisiblity = (newState) => {
    setShowPassword(!showPassword);
    setIconState(!showPassword);
    console.log(iconState);
    // passwordRef.current.type = 'text';
  };

  return (
    <div className={classes}>
      <div>
        <label htmlFor={labelFor && labelFor}>{labelText && labelText}</label>
        {field && field}

        {requiresIcon && (
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
      {enableButton && (
        <div>
          <Button
            text={buttonText && buttonText}
            onClick={buttonOnClick && buttonOnClick}
            type={buttonType && buttonType}
            disabled={buttonDisabled && buttonDisabled}
          />
        </div>
      )}
    </div>
  );
};

export default FormField;
