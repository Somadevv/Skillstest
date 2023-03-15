import Layout from '../components/common/layout';
import PageIntro from '../components/organisms/PageIntro/PageIntro';

export default function Home() {
  return (
    <>
      <Layout>
        <main>
          <PageIntro
            title="Create your Account"
            text="In 30 seconds you'll be a sign up pro!"
          />
        </main>
      </Layout>
    </>
  );
}
