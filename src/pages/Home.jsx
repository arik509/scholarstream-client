import Banner from '../components/Banner';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import TopScholarships from '../components/TopScholarships';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
};


export default Home;
