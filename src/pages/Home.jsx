import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FAQ from '../components/FAQ';
import Features from '../components/Features';
import Highlights from '../components/Highlights';
import Services from '../components/Services';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import TopScholarships from '../components/TopScholarships';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <Banner></Banner>
      <Features></Features>
      <TopScholarships></TopScholarships>
      <Services></Services>
      <Categories></Categories>
      <Highlights></Highlights>
      <Statistics></Statistics>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
};


export default Home;
