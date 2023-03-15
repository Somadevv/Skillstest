import React from 'react';
import styles from './pageintro.module.scss';
import localFont from 'next/font/local';
import Container from '../../common/Container/Container';

const sansLight = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});

const PageIntro = ({ title, text }) => {
  return (
    <Container type="content_sm" className={styles.component}>
      <h3 className={sansLight.className}>{title}</h3>
      <p className={sansLight.className}>{text}</p>
    </Container>
  );
};

export default PageIntro;
