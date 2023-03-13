import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./container.module.scss";

const Container = ({ children, className, type }) => {
  const classes = cn(styles.container, styles[`container_${type}`], className);

  return <div className={classes}>{children}</div>;
};

export default Container;

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
