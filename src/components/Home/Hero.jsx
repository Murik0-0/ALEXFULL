import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[40px] bg-darkBg min-h-[600px] flex items-center px-8 md:px-16 py-20 border border-gray-800">
      
      {/* 1. КОНТЕЙНЕР ДЛЯ ФОТО */}
      <div className="absolute right-0 top-0 h-full w-full md:w-2/3 z-0"> 
        {/* Увеличил ширину до 2/3 (md:w-2/3), чтобы логотипу было просторнее */}
        <img 
          src="/images/hero-bg.jpg" 
          alt="Warehouse" 
          className="w-full h-full object-cover object-right" // <--- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: object-right
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'; }}
        />
        
        {/* Градиент только по левому краю самого фото */}
        <div className="absolute inset-0 bg-gradient-to-r from-darkBg via-darkBg/40 to-transparent"></div>
      </div>

      {/* 2. ОБЩИЙ ГРАДИЕНТ для всего блока (создает глубокий черный слева) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-darkBg via-darkBg/60 to-transparent pointer-events-none"></div>

      {/* Фиолетовый отсвет снизу */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accentPurple/20 blur-[120px] rounded-full z-0"></div>

      {/* Контент */}
      <div className="relative z-10 max-w-3xl">
        <div className="inline-block px-4 py-1.5 rounded-full border border-accentPurple/40 bg-accentPurple/10 text-accentPurple text-[10px] uppercase tracking-widest font-bold mb-8">
          Фулфилмент для маркетплейсов
        </div>

        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          УПАКОВКА ДОСТАВКА <br /> 
          <span className="text-accentPurple">ХРАНЕНИЕ</span>
        </h1>

        <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed opacity-90">
          AlexFull — ваш надёжный фулфилмент-партнёр для роста на маркетплейсах. 
          Берём на себя все заботы по логистике от приёмки до доставки.
        </p>

        <div className="flex flex-wrap gap-6 items-center">
          <Link 
            to="/calc" 
            className="group bg-accentPurple hover:bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-lg shadow-purple-500/30"
          >
            Рассчитать стоимость 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          {/*
          <a href="https://www.tiktok.com/@alexfull777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-accentPurple group-hover:text-accentPurple transition-all">
              <Play size={20} fill="currentColor" />
            </div>
            <span className="text-sm font-medium">Посмотреть видео о нас</span>
          </a>
          */}
        </div>
      </div>

      {/* Статус-бар внизу справа */}
      <div className="absolute bottom-8 right-16 hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-10">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">Приёмка 24/7</span>
      </div>
    </section>
  );
}

export default Hero;
