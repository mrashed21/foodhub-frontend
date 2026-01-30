import CategoriesSection from "@/components/frontend/home/categories-section/categories-section";
import FeaturedMeals from "@/components/frontend/home/featured-meals/featured-meals";
import HeroSection from "@/components/frontend/home/hero-section/hero-section";
import HowItWorks from "@/components/frontend/home/how-It-works/how-It-works";
import PromoBanner from "@/components/frontend/home/promo-banner/promo-banner";
import Testimonials from "@/components/frontend/home/testimonials/testimonials";
import TopProviders from "@/components/frontend/home/top-providers/top-providers";

const HomePage = () => {
  return (
    <section>
      <HeroSection />
      <CategoriesSection />
      <FeaturedMeals />
      <TopProviders />
      <HowItWorks />
      <PromoBanner />
      <Testimonials />
    </section>
  );
};

export default HomePage;
