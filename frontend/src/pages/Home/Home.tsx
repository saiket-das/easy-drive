import { Hero, Testimonial } from "../../components/home";
import BestCars from "../../components/home/BestCars";
// import Footer from "../../components/home/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <BestCars />
      <Testimonial />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
