function AboutHero() {
  const stats = [
    { label: 'лет опыта в логистике', value: '3+', color: 'text-purple-500' },
    { label: 'довольных клиентов', value: '100+', color: 'text-blue-400' },
    { label: 'товаров обработано', value: '>1 млн', color: 'text-pink-500' },
  ];

  return (
    <section className="pt-12 pb-6 w-full px-4 lg:px-8">
      {/* На мобилках включаем overflow-hidden, чтобы скрывать фоновое свечение, на десктопе убираем, чтобы фото выступало */}
      <div className="relative rounded-[32px] md:rounded-[40px] border border-[#252538] bg-[#0f0f17] overflow-hidden lg:overflow-visible">
        
        {/* Фоновое свечение — на мобилках сделаем его чуть меньше и по центру */}
        <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] lg:w-[550px] h-[320px] lg:h-[550px] rounded-full bg-purple-600/15 lg:bg-purple-600/20 blur-[90px] lg:blur-[120px]" />
        </div>

        <div className="relative z-10 px-5 py-8 md:p-8 lg:px-14 lg:py-10 w-full">
          {/* Сетка: на мобильных занимает всю ширину, на десктопе делится на 12 колонок */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-4 items-stretch">
            
            {/* Левая часть — видна ВСЕГДА */}
            <div className="lg:col-span-5 flex flex-col justify-center z-30">
              <div className="inline-flex self-start items-center px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] md:text-[11px] font-semibold tracking-widest uppercase mb-4">
                О НАС
              </div>

              <h1 className="text-white font-black leading-[1.1] text-[28px] sm:text-[34px] md:text-[38px] lg:text-[46px] mb-4">
                Мы больше, чем<br />
                <span className="text-purple-500">просто склад</span>
              </h1>

              <p className="text-gray-400 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-relaxed mb-6 max-w-[440px]">
                AlexFull — это команда профессионалов, которая полностью берёт на себя всю
                рутину и логистические процессы. Мы делаем так, чтобы вы могли полностью
                сосредоточиться на маркетинге и кратно масштабировать свой бизнес.
              </p>

              <div className="grid grid-cols-3 gap-2 max-w-[420px]">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className={`text-[24px] sm:text-[30px] md:text-[34px] lg:text-[38px] font-black leading-none ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-gray-500 uppercase text-[9px] lg:text-[11px] leading-tight tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Буферная зона для фото (текст сюда не зайдет) — видна только на десктопе */}
            <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

            {/* Правая колонка с текстами (Биография и Кредо) — скрыта на мобилках, видна на десктопе */}
            <div className="hidden lg:flex lg:col-span-4 flex-col justify-between min-h-[340px] z-30">
  
              {/* Биография */}
              <div className="max-w-[280px]">
                <h3 className="text-white text-[20px] lg:text-[22px] font-bold tracking-tight leading-tight mb-3">
                  Александр — основатель Alexfull
                </h3>
                <p className="text-gray-400/80 text-[13px] lg:text-[13.5px] leading-relaxed font-normal">
                  Более 3 лет в логистике и e-commerce. Начинал с собственного успешного
                  магазина на WB, сегодня помогает другим брендам расти без операционных сложностей.
                </p>
              </div>

              {/* Личное кредо */}
              <div className="max-w-[320px] text-right self-end">
                <div className="text-purple-500 uppercase tracking-widest text-[10px] font-bold mb-1">
                  ЛИЧНОЕ КРЕДО
                </div>
                <p className="text-white/90 italic text-[14px] lg:text-[15px] leading-snug">
                  «Каждая деталь в цепочке поставок<br />
                  должна работать как швейцарские часы»
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Фото Александра — КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: добавили скрытие hidden и отображение начиная с lg:block */}
        <div
          className="
            hidden lg:block
            absolute 
            bottom-[-20px] md:bottom-[-30px] lg:bottom-[-128px]
            left-1/2 lg:left-[51%] 
            -translate-x-1/2 
            lg:ml-[30px]
            z-20
            h-[130%] lg:h-[150%]
            pointer-events-none 
            select-none
          "
        >
          <img
            src="/images/alex.png"
            alt="Александр"
            className="h-full w-auto object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;