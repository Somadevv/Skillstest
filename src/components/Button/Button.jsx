import styles from './button.module.scss';
import cn from 'classnames';

const Button = ({ type, onClick, text, disabled, ref, className }) => {
  const classes = cn(styles.component, className);

  return (
    <div className={classes}>
      <button type={type} onClick={onClick} disabled={disabled} ref={ref}>
        {text}
      </button>
    </div>
  );
};

export default Button;
