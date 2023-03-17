import styles from './button.module.scss';

const Button = ({ type, onClick, text, disabled }) => {
  return (
    <div className={styles.component}>
      <button type={type} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;
