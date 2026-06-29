import { useState, useEffect } from 'react';

function WeeklyDiscounts() {
  const [discountsData, setDiscountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateInfo, setUpdateInfo] = useState({ text: 'ЗАГРУЗКА...', daysAgo: null });

  useEffect(() => {
    // Загружаем данные из JSON файла
    fetch('/api/data/discounts.json')
      .then(response => response.json())
      .then(data => {
        setDiscountsData(data.discounts);
        // Устанавливаем информацию об обновлении
        if (data.lastUpdated) {
          const daysAgo = data.lastUpdated.daysAgo;
          const text = `ОБНОВЛЕНО ${daysAgo} ${getDaysText(daysAgo)} НАЗАД`;
          setUpdateInfo({ text, daysAgo });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки скидок:', error);
        setLoading(false);
      });
  }, []);

  // Функция для правильного склонения слова "день"
  const getDaysText = (days) => {
    if (days === 1) return 'ДЕНЬ';
    if (days >= 2 && days <= 4) return 'ДНЯ';
    return 'ДНЕЙ';
  };

  if (loading) {
    return (
      <section className="pt-12 pb-6">
        <div className="bg-[#0f0f17] rounded-[32px] border border-[#252538] p-6 lg:p-10">
          <div className="text-center text-gray-400">Загрузка скидок...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-12 pb-6">
      {/* Главная монолитная плашка блока в едином стиле */}
      <div className="bg-[#0f0f17] rounded-[32px] border border-[#252538] p-6 lg:p-10">
        
        {/* Заголовок блока и статус обновления */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              <h2 className="text-white font-black leading-tight text-[26px] md:text-[30px] lg:text-[34px]">
                Еженедельные скидки
              </h2>
            </div>
            <p className="text-gray-400 text-[14px] lg:text-[15px] max-w-[620px] leading-relaxed">
              Специальные предложения и скидки на услуги фулфилмента, обновляемые каждый понедельник.
            </p>
          </div>

          {/* Плашка "Обновлено" в стиле нового интерфейса */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-gray-300 bg-[#161622] px-4 py-2 w-fit rounded-full border border-[#252538] shrink-0 self-start md:self-end">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {updateInfo.text}
          </div>
        </div>

        {/* Сетка с карточками */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discountsData.map((item) => (
            <div 
              key={item.id} 
              className="group flex flex-col justify-between p-6 bg-[#13131c] rounded-[24px] border border-[#252538] hover:border-purple-500/40 transition-all duration-300"
            >
              <div>
                {/* Аккуратный округлый бейдж */}
                <span className="inline-block text-[9px] font-extrabold tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase mb-4">
                  {item.badge}
                </span>

                {/* Заголовок карточки с эффектом смены цвета при наведении */}
                <h3 className="text-white font-bold text-[18px] lg:text-[19px] leading-snug mb-2 transition-colors group-hover:text-purple-400">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-[13px] lg:text-[13.5px] leading-relaxed mb-8">
                  {item.description}
                </p>
              </div>

              {/* Нижняя секция с ценами */}
              <div className="flex justify-between items-center pt-5 border-t border-[#252538]/60 mt-auto">
                <span className="text-gray-500 line-through text-[13px] font-medium">
                  {item.priceOld}
                </span>
                <span className="text-white font-black text-[16px] lg:text-[17px] tracking-tight transition-colors group-hover:text-purple-400">
                  {item.priceNew}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WeeklyDiscounts;