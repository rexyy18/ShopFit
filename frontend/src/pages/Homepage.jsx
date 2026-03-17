import HeroSlider from "../components/layout/HeroSlider";
import FeatureBanners from "../components/layout/FeatureBanners";
import ProductGrid from "../components/product/ProductGrid";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <FeatureBanners />
      <ProductGrid />
    </div>
  );
};

export default HomePage;
