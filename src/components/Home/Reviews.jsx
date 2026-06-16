import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

function Reviews() {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Состояние для текущего индекса слайдера
  const [currentIndex, setCurrentIndex] = useState(0);
  // Состояние для определения мобильного режима
  const [isMobile, setIsMobile] = useState(false);

  // 1. Отслеживаем ширину экрана для адаптивности слайдера
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // md брейкпоинт в Tailwind (768px)
      setIsMobile(mobile);
      // Сбрасываем индекс при изменении экрана, чтобы избежать пустых пространств
      setCurrentIndex(0);
    };

    handleResize(); // Вызываем при первой загрузке
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Загрузка данных
  useEffect(() => {
    fetch('/data/reviews.json')
      .then(response => response.json())
      .then(data => {
        setReviewsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки отзывов:', error);
        setLoading(false);
      });
  }, []);

  // Вычисляем максимальный индекс прокрутки
  // На мобилках прокрутка до последнего элемента, на десктопе — оставляем последние 3 видимыми
  const maxIndex = reviewsData.length ? (isMobile ? reviewsData.length - 1 : Math.max(0, reviewsData.length - 3)) : 0;

  // Функции переключения
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Загрузка отзывов...</div>;
  }

  return (
    <section className="pt-12 pb-6 w-full overflow-hidden">
      {/* Главная плашка блока */}
      <div className="bg-[#0f0f17] rounded-[32px] border border-[#252538] p-6 lg:p-10">
        
        {/* Шапка блока и навигация */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              <h2 className="text-white font-black leading-tight text-[26px] md:text-[30px] lg:text-[34px]">
                Отзывы клиентов
              </h2>
            </div>
            <p className="text-gray-400 text-[14px] lg:text-[15px] max-w-[620px] leading-relaxed">
              Что говорят селлеры о сотрудничестве с фулфилментом Alexfull
            </p>
          </div>

          {/* Рабочие кнопки пагинации */}
          <div className="flex gap-2.5 self-end sm:self-center">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#252538] bg-[#141420] flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 hover:bg-[#191929] transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#252538] bg-[#141420] flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 hover:bg-[#191929] transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Окно просмотра (Viewport) карусели */}
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex * (isMobile ? 100 : 33.333)}% - ${currentIndex * (isMobile ? 0 : 16)}px))`
            }}
          >
            {reviewsData.map((review) => (
              <div 
                key={review.id} 
                className="group p-6 lg:p-8 bg-[#13131c] rounded-[24px] border border-[#252538]/60 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between w-full md:w-[calc(33.333%-16px)] shrink-0"
              >
                <div>
                  {/* Иконка кавычки */}
                  <div className="text-purple-500/30 group-hover:text-purple-500/60 transition-colors duration-300 mb-5">
                    <Quote size={24} transform="rotate(180)" />
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-gray-300 text-[14px] lg:text-[14.5px] leading-relaxed mb-8 font-normal">
                    {review.text}
                  </p>
                </div>

                {/* Автор */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#252538]/40 mt-auto">
                  <div>
                    <div className="text-white font-bold text-[14px] leading-tight mb-0.5">
                      {review.author}
                    </div>
                    <div className="text-gray-500 text-[12px] font-medium">
                      {review.subtitle}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Reviews;