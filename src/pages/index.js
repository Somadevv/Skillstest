import Layout from '../components/common/layout';

import SignupForm from '../components/organisms/SignupForm/SignupForm';

export default function Home() {
  return (
    <>
      <Layout>
        <main>
          <SignupForm />
        </main>
      </Layout>
    </>
  );
}
