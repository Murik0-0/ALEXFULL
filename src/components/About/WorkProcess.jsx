import { Package, Database, Box, Truck, Eye, Cpu, Users, PhoneCall, ArrowRight } from 'lucide-react';

function WorkProcess() {
  // Данные для первого ряда (Шаги процесса)
  const steps = [
    { num: '01', title: 'Приёмка товара', desc: 'Проверяем целостность упаковки, взвешиваем и быстро принимаем ваш товар на склад за 1 день.', icon: <Package size={18} /> },
    { num: '02', title: 'Хранение', desc: 'Размещаем на теплом безопасном складе с круглосуточной охраной и точным учётом в WMS.', icon: <Database size={18} /> },
    { num: '03', title: 'Упаковка и маркировка', desc: 'Упакуем по регламентам WB/Ozon, наносим штрихкоды и готовим к транспортировке.', icon: <Box size={18} /> },
    { num: '04', title: 'Отгрузка', desc: 'Оперативно доставляем готовую партию на склады маркетплейсов или ПВЗ по схеме FBS.', icon: <Truck size={18} /> },
  ];

  // Данные для второго ряда (Преимущества работы)
  const advantages = [
    { title: 'Прозрачность', desc: 'Вы всегда в реальном времени контролируете остатки и статус сборки каждого заказа.', icon: <Eye size={18} />, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { title: 'Технологичность', desc: 'Современная интеграция с WMS-системами маркетплейсов и моментальный обмен данными.', icon: <Cpu size={18} />, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { title: 'Индивидуальный подход', desc: 'Учитываем особенности товарной группы и гибко адаптируем упаковку под любые запросы.', icon: <Users size={18} />, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
    { title: 'Поддержка 24/7', desc: 'Персональный менеджер всегда ответит на любой срочный вопрос и решит нештатные ситуации.', icon: <PhoneCall size={18} />, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  ];

  return (
    <section className="py-12 lg:py-16 w-full px-4 lg:px-8">
      {/* Шапка блока */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
          <h2 className="text-white font-black leading-tight text-[28px] md:text-[32px] lg:text-[36px]">
            Как мы работаем
          </h2>
        </div>
        <p className="text-gray-400 text-[14px] lg:text-[15px] max-w-[600px]">
          Понятный и отлаженный процесс взаимодействия от первой поставки до довольного покупателя
        </p>
      </div>

      {/* ПЕРВЫЙ РЯД: Пошаговый процесс (01 - 04) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="relative flex flex-col justify-between p-6 rounded-[28px] border border-[#252538] bg-[#0f0f17] transition-all duration-300 hover:border-purple-500/30"
          >
            {/* Контент карточки */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-700/80 font-black text-[24px] leading-none tracking-tight">
                  {step.num}
                </span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-white font-bold text-[18px] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-400 text-[13px] lg:text-[13.5px] leading-relaxed">
                {step.desc}
              </p>
            </div>

            {/* Стрелочки-указатели между карточками (скрыты на мобилках, видны только на десктопе между 1, 2 и 3 шагом) */}
            {idx < 3 && (
              <div className="hidden lg:flex items-center justify-center absolute -right-[16px] top-1/2 -translate-y-1/2 z-20 text-gray-700 pointer-events-none">
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ВТОРОЙ РЯД: Преимущества и ценности */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((item, idx) => (
          <div 
            key={idx} 
            className="p-6 rounded-[28px] border border-[#252538] bg-[#0f0f17] transition-all duration-300 hover:border-purple-500/20"
          >
            {/* Горизонтальная шапка карточки: иконка слева, текст справа */}
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${item.color} shrink-0`}>
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-[17px] lg:text-[18px] leading-tight">
                {item.title}
              </h3>
            </div>
            
            <p className="text-gray-400 text-[13px] lg:text-[13.5px] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkProcess;