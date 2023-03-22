import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Streeva Skilltest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
