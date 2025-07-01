import Hero from "../components/Hero";
import FeaturedRecipes from "../components/FeaturedReceipts";
import Shortcuts from "../components/Shortcuts";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedRecipes />
      <Shortcuts />
      <Footer />
    </main>
  );
}