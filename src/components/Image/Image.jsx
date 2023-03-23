import cn from 'classnames';

import Image from 'next/image';
import styles from './image.module.scss';

const Img = ({ className, src, alt, height, width }) => {
  const classes = cn(styles.image, className);

  return (
    <Image
      className={classes}
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  );
};

export default Img;
