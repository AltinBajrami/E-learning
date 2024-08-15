
import Header from "../../organisms/Header/Header";
import VideoSection from "../../organisms/VideoSection/VideoSection";
import Footer from "../../organisms/Footer/Footer";
import Partners from "../../organisms/PartnersSection/Partners";
import Testimonials from "../../organisms/Testimonials/Testimonials";
import FAQ from '../../organisms/FAQ/FAQ';
import StackCards from "../../organisms/StackCards/StackCards";
import ServicesSection from '../../organisms/ServicesSection/ServicesSection'
import ScrollToTopButton from "../../organisms/Scroll/ScrollToTopButton";
// import scroll from '../../../Astets/scroll.png'

const Landing = () => {
  return (
    <div>
      {/* <img src={scroll} alt="Scroll to top" /> */}
      <ScrollToTopButton />
      <Header />
      <VideoSection />
      <ServicesSection />
      <Testimonials />
      <Partners />
      <FAQ />
      <Footer />
    </div>
  );
};


export default Landing;
