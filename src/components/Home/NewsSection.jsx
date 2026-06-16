import { useState, useEffect } from 'react';

function NewsSection() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  // 1. Создаем стейт для текста обновления
  const [updateText, setUpdateText] = useState('ЗАГРУЗКА...');

  // 2. Функция для правильного склонения слова "день"
  const getDaysText = (days) => {
    const num = Number(days);
    if (num === 1) return 'ДЕНЬ';
    if (num >= 2 && num <= 4) return 'ДНЯ';
    return 'ДНЕЙ';
  };

  useEffect(() => {
    // Загружаем данные из правильного JSON-файла новостей
    fetch('/data/news.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки файла новостей');
        }
        return response.json();
      })
      .then(data => {
        // Защита: проверяем, что внутри пришел именно массив
        if (data && Array.isArray(data.news)) {
          setNewsData(data.news);
          
          // 3. Вытаскиваем инфу об обновлении из JSON и сетим её
          if (data.lastUpdated && typeof data.lastUpdated.daysAgo !== 'undefined') {
            const days = data.lastUpdated.daysAgo;
            setUpdateText(`ОБНОВЛЕНО ${days} ${getDaysText(days)} НАЗАД`);
          } else {
            setUpdateText('СЛЕДИТЕ ЗА ОБНОВЛЕНИЯМИ');
          }
        } else {
          console.error('Данные в JSON не являются массивом под ключом "news"');
          setUpdateText('ОШИБКА ДАННЫХ');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setUpdateText('ОШИБКА ЗАГРУЗКИ');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="pt-12 pb-6">
        <div className="bg-[#0f0f17] rounded-[32px] border border-[#252538] p-6 lg:p-10">
          <div className="text-center text-gray-400">Загрузка новостей...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-12 pb-6">
      <div className="bg-[#0f0f17] rounded-[32px] border border-[#252538] p-6 lg:p-10">
        
        {/* Заголовок блока */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
            <h2 className="text-white font-black leading-tight text-[26px] md:text-[30px] lg:text-[34px]">
              Топ-10 новостей Wildberries
            </h2>
          </div>
          
          {/* Динамическая плашка с колокольчиком — теперь updateText определен! */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-gray-300 bg-[#161622] px-4 py-2 w-fit rounded-full border border-[#252538] shrink-0 uppercase select-none">
            <span>🔔</span>
            {updateText}
          </div>
        </div>

        {/* Сетка новостей строго как на макете (две колонки) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsData.map((item) => (
            <a 
              key={item.id} 
              href={item.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex gap-4 p-6 bg-[#13131c] rounded-[24px] border border-[#252538] hover:border-purple-500/40 hover:bg-[#161622] transition-all duration-300 cursor-pointer block"
            >
              {/* Порядковый номер (например, 01, 02...) */}
              <div className="text-gray-700 font-black text-[20px] leading-none select-none transition-colors group-hover:text-purple-500/50">
                {String(item.id).padStart(2, '0')}
              </div>

              <div className="flex flex-col gap-3 w-full">
                {/* Мета-информация: Дата и Бейдж */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[12px] font-medium">
                    {item.date}
                  </span>
                  <span className="inline-block text-[9px] font-extrabold tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Заголовок-суть новости */}
                <h3 className="text-white font-bold text-[15px] lg:text-[16px] leading-snug transition-colors group-hover:text-purple-400">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default NewsSection;