function Equipment() {
  const equipData = [
    {
      badge: 'ЗАПАЙЩИК ПАКЕТОВ',
      title: 'Прессовый импульсный запайщик',
      description: 'Обеспечивает герметичное закрытие пакетов с предварительным прессованием воздуха. Это позволяет снизить объём посылок и сэкономить на тарифах хранения.',
      img: '/images/equip1.jpg'
    },
    {
      badge: 'ТЕРМОУСАДОЧНАЯ ПЛЁНКА',
      title: 'Высокотемпературная термоусадка',
      description: 'Профессиональная обтяжка плотной полимерной плёнкой. Предотвращает повреждения и гарантирует отсутствие несанкционированного доступа.',
      img: '/images/equip2.jpg'
    }
  ];

  return (
    <section className="py-12 lg:py-16 w-full px-4 lg:px-8">
      {/* Главная двухколоночная сетка: слева заголовок, справа карточки */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Левая колонка: Заголовок и описание (занимает 4 колонки из 12) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
            <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">ОБОРУДОВАНИЕ</span>
          </div>
          
          <h2 className="text-white font-black leading-tight text-[28px] md:text-[32px] lg:text-[36px] mb-4">
            Наше оборудование<br />и услуги
          </h2>
          
          <p className="text-gray-400 text-[14px] lg:text-[15px] leading-relaxed max-w-[320px]">
            Специализированная подготовка и премиальная упаковка товаров по стандартам маркетплейсов.
          </p>
        </div>

        {/* Правая колонка: Две стильные карточки в ряд (занимает 8 колонок из 12) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {equipData.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#252538] bg-[#0f0f17] p-3 transition-all duration-300 hover:border-purple-500/40"
            >
              {/* Контейнер для изображения (теперь оно обрезано аккуратно сверху) */}
              <div className="relative h-52 md:h-56 w-full overflow-hidden rounded-[20px] bg-[#181824]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Equipment'; }}
                />
                
                {/* Бейдж прямо поверх картинки в левом верхнем углу (как на референсах) */}
                <span className="absolute top-3 left-3 px-3 py-1 text-[9px] font-extrabold tracking-wider text-purple-400 bg-[#0f0f17]/90 backdrop-blur-sm rounded-full border border-purple-500/20 uppercase">
                  {item.badge}
                </span>
              </div>

              {/* Текстовый блок карточки с внутренними отступами */}
              <div className="pt-4 pb-2 px-2">
                <h3 className="text-white font-bold text-[18px] lg:text-[19px] leading-snug mb-2 transition-colors group-hover:text-purple-400">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-[13px] lg:text-[13.5px] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Equipment;