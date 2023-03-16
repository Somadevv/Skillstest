import styles from './signupform.module.scss';
import data from '../../../../data/forms/signup.json';
import Container from '../../common/Container/Container';
import localFont from 'next/font/local';

const sansLight = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Light.ttf',
});
const sansRegular = localFont({
  src: '../../../../public/fonts/Soure_Sans_Pro/SourceSansPro-Regular.ttf',
});

const SignupForm = () => {
  return (
    <Container type="content_sm" className={styles.component}>
      <div className={styles.form_intro}>
        <h3 className={sansRegular.className}>Create your Account</h3>
        <p className={sansLight.className}>
          In 30 seconds you&#39;ll be a sign up pro!
        </p>
      </div>
      <form action="/send-data-here" method="post" className={styles.form}>
        {data &&
          data.primary.map((item, idx) => (
            <div key={idx} className={styles.form_item}>
              {item.label && (
                <label htmlFor={item.name} className={sansLight.className}>
                  {item.label}
                </label>
              )}
              <input type={item.type} className={sansRegular.className} />
            </div>
          ))}
        <button type="submit">Sign Up</button>
      </form>
    </Container>
  );
};

export default SignupForm;
