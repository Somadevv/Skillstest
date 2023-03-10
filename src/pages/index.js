import Head from 'next/head';
import Button from '../components/atoms/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title> Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button />
      </main>
    </>
  );
}
