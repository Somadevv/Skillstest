import React from 'react';
import styles from './header.module.scss';
import Image from '../../atoms/Image/Image';
import Link from 'next/link';
import localFont from 'next/font/local';
import Container from '../../common/Container/Container';

const sansLight = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-SemiBold.ttf',
});
const Header = () => {
  return (
    <Container type="global" className={styles.header}>
      <div className={styles.header_inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/mainlogo.svg" width={120} height={20} alt="" />
        </Link>
        <div className={styles.header_menu}>
          <ul>
            <li>
              <Link href="/" className={sansLight.className}>
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`${sansLight.className} highlight-text-main`}
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Header;
