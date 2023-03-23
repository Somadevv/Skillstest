import Layout from './layout.js';
import Container from '../components/Container/Container';
import Image from 'next/image';
import styles from './signupsuccess.module.scss';
import Link from 'next/link';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

const sansRegular = localFont({
  src: '../../public/fonts/Soure_Sans_Pro/SourceSansPro-Regular.ttf',
});
const sansLight = localFont({
  src: '../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});
const sansBold = localFont({
  src: '../../public/fonts/Soure_Sans_Pro/SourceSansPro-Bold.ttf',
});
const oleoRegular = localFont({
  src: '../../public/fonts/Oleo_Script/OleoScript-Regular.ttf',
});

export default function SignupSuccess() {
  const router = useRouter();
  const { email } = router.query;
  return (
    <Layout>
      <Container
        type="content_sm"
        className={`${sansRegular.className} ${styles.page}`}
      >
        <Image src={'/images/success.svg'} width={150} height={150} alt="" />
        <div className={styles.body}>
          <p className={`${sansBold.className} ${styles.title}`}>
            Verify your email
          </p>
          <p className={`${sansLight.className} ${styles.desc}`}>
            We have sent an email to
            <span className={sansRegular.className}> {email}</span> to verify
            your email. Please click the link in that email to continue.
          </p>
          <div className="signin_prompt">
            <p className={styles.prompt}>
              Didn&#39;t receive an email?
              <Link
                href="/"
                className={`${sansBold.className} hightlight-pink`}
              >
                &nbsp;Send again
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
