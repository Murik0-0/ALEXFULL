import { MapPin, Zap, TrendingUp } from 'lucide-react';

function Features() {
  const featuresData = [
    {
      id: 1,
      title: 'Склад в Москве',
      description: 'Удобное расположение и быстрая отгрузка со склада в столице',
      icon: MapPin, // Передаем ссылку на компонент, а не готовый JSX
      type: 'purple',
    },
    {
      id: 2,
      title: 'Быстрая обработка',
      description: 'Приёмка, упаковка и отправка на маркетплейсы в день обращения',
      icon: Zap,
      type: 'blue',
    },
    {
      id: 3,
      title: 'Работаем на результат',
      description: 'Помогаем экономить ваше время, снижать издержки и зарабатывать больше',
      icon: TrendingUp,
      type: 'green',
    },
  ];

  // Цветовая разметка в соответствии с дизайн-системой
  const themeMap = {
    purple: {
      bg: 'bg-purple-500/10 border-purple-500/20',
      text: 'text-purple-400',
      borderHover: 'hover:border-purple-500/40',
    },
    blue: {
      bg: 'bg-sky-500/10 border-sky-500/20',
      text: 'text-sky-400',
      borderHover: 'hover:border-sky-500/40',
    },
    green: {
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      text: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/40',
    },
  };

  return (
    <section className="pt-12 pb-6">
      {/* Сетка преимуществ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        {featuresData.map((item) => {
          const theme = themeMap[item.type] || themeMap.purple;
          const IconComponent = item.icon;

          return (
            <div 
              key={item.id} 
              className={`p-6 lg:p-8 bg-[#13131c] rounded-[28px] border border-[#252538]/70 ${theme.borderHover} transition-all duration-300 group flex flex-col justify-start`}
            >
              {/* Контейнер иконки в виде аккуратного технологичного круга */}
              <div className={`mb-6 w-11 h-11 rounded-full ${theme.bg} border flex items-center justify-center ${theme.text} transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                <IconComponent size={20} />
              </div>

              {/* Заголовок преимущества */}
              <h3 className="text-white font-black text-[20px] lg:text-[22px] tracking-tight mb-2.5 leading-snug">
                {item.title}
              </h3>
              
              {/* Описание */}
              <p className="text-gray-400 text-[13.5px] lg:text-[14px] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;