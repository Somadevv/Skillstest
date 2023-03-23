import Layout from './layout.js';

import SignupForm from '../components/SignupForm/SignupForm.jsx';

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
