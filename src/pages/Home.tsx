import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Container from "../components/Container";

import Tips from "../components/Tips";
import Review from "../components/Reviews";
import Faqs from "../components/FAQs";
import CompanyStatistics from "../components/companystatistics";
import Footer from "../components/Footer";
import Location from "../components/googlemaps";
import VehicleList from "../features/vehicle";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <section id="hero">
          <Hero />
        </section>

        <section id="carlist">
          <VehicleList />
        </section>

        <section id="tips">
          <Tips />
        </section>

        <section id="reviews">
          <Review />
        </section>

        <section id="location">
          <Location />
        </section>

        <section id="faqs">
          <Faqs />
        </section>

        <section id="stats">
          <CompanyStatistics />
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
