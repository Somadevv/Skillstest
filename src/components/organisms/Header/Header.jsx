import React from 'react';
import styles from './header.module.scss';
import Image from '../../atoms/Image/Image';
import Link from 'next/link';
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.png" width={36} height={24} alt="" />
          <p className={styles.logo_text}>Singupro</p>
        </Link>
        <div className={styles.header_menu}>
          <ul>
            <li>
              <Link href="/">Log In</Link>
            </li>
            <li>
              <Link href="/" className="highlight-text-main">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
