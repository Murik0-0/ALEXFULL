import { CheckCircle2 } from 'lucide-react';

function Partners() {
  const partnersData = [
    {
      id: 1,
      logo: '/images/wb.png',
      category: 'ПАРТНЕР',
      title: 'Wildberries',
      description: 'Полная интеграция по API, быстрая маркировка по стандартам WB, автоматическое обновление остатков и цен.',
      feature: 'Поддержка поставок FBO и FBS',
      type: 'purple',
    },
    {
      id: 2,
      logo: '/images/ozon.png',
      category: 'ИНТЕГРАЦИЯ',
      title: 'Ozon Seller',
      description: 'Печать этикеток Ozon, сборка отправлений в жесткие сроки, бесшовная отгрузка на сортировочные центры.',
      feature: 'Экспресс-сборка за 1 час',
      type: 'blue',
    },
    {
      id: 3,
      logo: '/images/fbs.png',
      category: 'МЫ РАБОТАЕМ ЧЕРЕЗ',
      title: 'Схему FBS',
      description: 'Fullfillment by Seller — храните товары на нашем безопасном складе, а мы соберём, упакуем и передадим заказ службе доставки маркетплейса в течение пары часов.',
      feature: 'Минимум штрафов, 100% выкуп',
      type: 'green',
    },
  ];

  // Маппинг стилей под каждый тип интеграции для сохранения чистоты кода
  const themeMap = {
    purple: {
      borderHover: 'hover:border-purple-500/40',
      glow: 'bg-purple-500/10',
      icon: 'text-purple-400',
      badge: 'text-purple-400 bg-purple-500/5 border-purple-500/10',
    },
    blue: {
      borderHover: 'hover:border-sky-500/40',
      glow: 'bg-sky-500/10',
      icon: 'text-sky-400',
      badge: 'text-sky-400 bg-sky-500/5 border-sky-500/10',
    },
    green: {
      borderHover: 'hover:border-emerald-500/40',
      glow: 'bg-emerald-500/10',
      icon: 'text-emerald-400',
      badge: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10',
    },
  };

  return (
    <section className="pt-12 pb-6">
      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        {partnersData.map((partner) => {
          const theme = themeMap[partner.type] || themeMap.purple;

          return (
            <div 
              key={partner.id} 
              className={`group flex flex-col justify-between p-6 lg:p-8 bg-[#13131c] rounded-[28px] border border-[#252538]/70 ${theme.borderHover} transition-all duration-300 relative overflow-hidden`}
            >
              {/* Мягкий угловой Glow-эффект */}
              <div className={`absolute -top-16 -right-16 w-36 h-36 blur-[50px] rounded-full ${theme.glow} pointer-events-none transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative z-10">
                {/* Логотип бренда с легким бустом яркости для темной темы */}
                <div className="mb-6 h-10 flex items-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.title} 
                    className="h-full object-contain filter brightness-110 select-none" 
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100x40?text=Logo'; }} 
                  />
                </div>

                {/* Категория и заголовок */}
                <div className="mb-4">
                  <span className={`inline-block text-[9px] font-extrabold tracking-wider border px-2.5 py-0.5 rounded-md uppercase mb-2 ${theme.badge}`}>
                    {partner.category}
                  </span>
                  <h3 className="text-white font-black text-[22px] lg:text-[24px] tracking-tight leading-none">
                    {partner.title}
                  </h3>
                </div>

                {/* Описание */}
                <p className="text-gray-400 text-[13.5px] lg:text-[14px] leading-relaxed mb-8 font-normal">
                  {partner.description}
                </p>
              </div>

              {/* Нижняя технологичная плашка фичи */}
              <div className="relative z-10 flex items-center gap-2.5 text-[12px] font-bold text-gray-300 bg-[#161622] p-3.5 rounded-xl border border-[#252538]/60 mt-auto">
                <CheckCircle2 className={`${theme.icon} shrink-0`} size={15} />
                <span className="tracking-wide">{partner.feature}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Partners;