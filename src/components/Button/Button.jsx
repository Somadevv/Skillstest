import styles from './button.module.scss';
import cn from 'classnames';

const Button = ({ type, onClick, text, disabled, className }) => {
  const classes = cn(styles.component, className);

  return (
    <div className={classes}>
      <button type={type} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;
