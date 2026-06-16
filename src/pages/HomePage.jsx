import Hero from '../components/Home/Hero';
import Feature from '../components/Home/Feature';
import Partners from '../Components/Home/partners';
import WeeklyDiscounts from '../components/Home/WeeklyDiscounts';
import NewsSection from '../components/Home/NewsSection';
import Reviews from '../components/Home/Reviews';

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Сюда будем добавлять остальные блоки по мере создания */}
      <Hero />
      <Feature />
      <Partners />
      <WeeklyDiscounts />
      <NewsSection />
      <Reviews />
    </div>
  );
}

export default HomePage;
