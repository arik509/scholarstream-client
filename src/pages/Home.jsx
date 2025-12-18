import Banner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import TopScholarships from '../components/TopScholarships';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <Testimonials></Testimonials>
      {/* <FAQ /> */}
    </div>
  );
};

export default Home;
