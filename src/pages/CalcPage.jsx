import React, { useState, useEffect } from 'react';
import { Calculator, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { CalcUserContacts } from '../components/calc/CalcUserContacts';

function CalcPage() {
  // Конфигурационные стейты для баз данных
  const [config, setConfig] = useState({});
  const [services, setServices] = useState([]);
  const [packagings, setPackagings] = useState([]);
  const [markings, setMarkings] = useState([]);
  const [extras, setExtras] = useState({});
  const [loading, setLoading] = useState(true);

  // Текущий шаг калькулятора (от 1 до 6)
  const [currentStep, setCurrentStep] = useState(1);

  // Стейты формы калькулятора
  const [formData, setFormData] = useState({
    marketplace: '',
    productType: '',
    productName: '',
    quantity: 100,
    size: 'S',
    priority: 'standard',
    packagingId: '',
    markingIds: [],
    extraServiceIds: [],
    pickupLocationId: ''
  });

  const [selectedServices, setSelectedServices] = useState([]);

  // Данные клиента для отправки лида
  const [clientData, setClientData] = useState({ name: '', phone: '', comment: '' });
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // ИСПРАВЛЕНО: Загружаем конфигурации из /api/data вместо статического /data
  useEffect(() => {
    Promise.all([
      fetch('/api/data/calcStepsData.json').then(res => res.json()),
      fetch('/api/data/servicesPrice.json').then(res => res.json()),
      fetch('/api/data/packagingPrice.json').then(res => res.json()),
      fetch('/api/data/markingPrice.json').then(res => res.json()),
      fetch('/api/data/extraPrice.json').then(res => res.json())
    ]).then(([steps, serv, pack, mark, ext]) => {
      setConfig(steps);
      setServices(serv);
      setPackagings(pack);
      setMarkings(mark);
      setExtras(ext);
      
      // Инициализируем дефолты
      setFormData(prev => ({
        ...prev,
        marketplace: steps.marketplaces?.[0] || '',
        productType: steps.productTypes?.[0] || '',
        packagingId: pack[0]?.id || '',
        pickupLocationId: ext.pickupLocations?.[0]?.id || ''
      }));
      setLoading(false);
    }).catch(err => console.error('Ошибка загрузки конфигураций калькулятора:', err));
  }, []);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  // --- МАТЕМАТИЧЕСКАЯ ЛОГИКА СУММИРОВАНИЯ ---
  const calculateTotal = () => {
    let total = 0;
    let isEstimated = false;
    const qty = formData.quantity;

    selectedServices.forEach(id => {
      const target = services.find(s => s.id === id);
      if (target) {
        if (target.price === null) isEstimated = true;
        else total += target.price * qty;
      }
    });

    const activePkg = packagings.find(p => p.id === formData.packagingId);
    if (activePkg) {
      if (activePkg.price === null) isEstimated = true;
      else total += activePkg.price * qty;
    }

    formData.markingIds.forEach(id => {
      const target = markings.find(m => m.id === id);
      if (target) {
        if (target.price === null) isEstimated = true;
        else total += target.price * qty;
      }
    });

    const activeLoc = extras.pickupLocations?.find(l => l.id === formData.pickupLocationId);
    if (activeLoc) {
      if (activeLoc.price === null) isEstimated = true;
      else total += activeLoc.price;
    }

    return { total, isEstimated };
  };

  const { total, isEstimated } = calculateTotal();

  // Сохранение лида в JSON
  const handleSubmitLead = async () => {
    if (!clientData.name || !clientData.phone) {
      setStatusMsg('Заполните обязательные поля: Имя и Телефон');
      return;
    }
    setIsSending(true);

    const fullLeadData = {
      id: Date.now(),
      date: new Date().toLocaleString('ru-RU'),
      calcDetails: {
        ...formData,
        servicesSelected: selectedServices
      },
      calculatedPrice: isEstimated ? `от ${total} ₽` : `${total} ₽`,
      client: clientData
    };

    try {
      let currentLeads = [];
      try {
        // ИСПРАВЛЕНО: Читаем существующие лиды через API бэкенда
        const checkRes = await fetch('/api/data/leadsData.json');
        currentLeads = await checkRes.json();
      } catch (e) {
        currentLeads = [];
      }

      currentLeads.push(fullLeadData);

      // ИСПРАВЛЕНО: Убран localhost:5002. Теперь путь относительный, чтобы запросы на проде шли куда нужно
      const saveResponse = await fetch('/api/save-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: 'leadsData.json', data: currentLeads })
      });

      const resData = await saveResponse.json();
      if (resData.success) {
        setStatusMsg('Расчет успешно сохранен!');
        setClientData({ name: '', phone: '', comment: '' });
        setCurrentStep(1); // сброс на первый шаг
      } else {
        setStatusMsg('Ошибка записи данных на сервере');
      }
    } catch (err) {
      setStatusMsg('Ошибка отправки. Убедитесь, что сервер бэкенда запущен');
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Загрузка параметров калькулятора...</div>;

  // Названия шагов для прогресс-бара
  const stepLabels = ["Маркетплейс", "Партия", "Габариты", "Услуги", "Упаковка", "Финал"];

  return (
    <div className="min-h-screen bg-[#09090e] text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Шапка калькулятора */}
        <div className="flex items-center gap-4 bg-[#0f0f17] border border-[#252538] p-6 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Calculator size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider text-white">Умный калькулятор фулфилмента</h1>
            <p className="text-xs text-gray-500 mt-0.5">Пошаговый расчет стоимости подготовки и отправки товаров на маркетплейсы</p>
          </div>
        </div>

        {/* Визуальный индикатор шагов (Степпер) */}
        <div className="grid grid-cols-6 gap-2 text-center">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStep === stepNum;
            const isPassed = currentStep > stepNum;
            return (
              <div key={idx} className="space-y-2">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent ? 'bg-purple-500' : isPassed ? 'bg-purple-900' : 'bg-[#252538]'
                }`} />
                <span className={`hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider ${
                  isCurrent ? 'text-purple-400' : isPassed ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Главное интерактивное окно шага */}
        <div className="bg-[#0f0f17] border border-[#252538] rounded-3xl p-6 md:p-8 shadow-2xl relative">
          
          {/* ТЕКУЩИЙ ШАГ ПОДПИСЬ */}
          <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-6">
            Шаг {currentStep} из 6 — {stepLabels[currentStep - 1]}
          </div>

          {/* КОНТЕНТ ШАГОВ */}
          <div className="min-h-[260px]">
            
            {/* ШАГ 1: Площадка и Категория */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-white font-bold text-lg">На каком маркетплейсе планируете работать?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">Выберите маркетплейс</label>
                    <select 
                      value={formData.marketplace} 
                      onChange={(e) => handleFormChange('marketplace', e.target.value)}
                      className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      {config.marketplaces?.map((m, i) => <option key={i} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">Категория / Тип товара</label>
                    <select 
                      value={formData.productType} 
                      onChange={(e) => handleFormChange('productType', e.target.value)}
                      className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      {config.productTypes?.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ШАГ 2: Название и Количество */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-white font-bold text-lg">Укажите информацию об объёме партии</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">Название товара или ссылка на карточку</label>
                    <input 
                      type="text"
                      value={formData.productName}
                      onChange={(e) => handleFormChange('productName', e.target.value)}
                      placeholder="Например: Кроссовки мужские зимние"
                      className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">Количество (штук)</label>
                    <input 
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => handleFormChange('quantity', parseInt(e.target.value) || 0)}
                      className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ШАГ 3: Габариты изделия и Приоритеты */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-white font-bold text-lg">Габариты и сроки исполнения заказа</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">Размерный класс упаковки</label>
                    <select 
                      value={formData.size} 
                      onChange={(e) => handleFormChange('size', e.target.value)}
                      className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-xs focus:outline-none focus:border-purple-500"
                    >
                      {config.sizes?.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-2">Срочность обработки склада</label>
                    <select 
                      value={formData.priority} 
                      onChange={(e) => handleFormChange('priority', e.target.value)}
                      className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      {config.priorities?.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ШАГ 4: Складские услуги */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">Какие базовые услуги фулфилмента требуются?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                  {services.map((srv) => (
                    <label 
                      key={srv.id} 
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                        selectedServices.includes(srv.id) ? 'bg-purple-600/10 border-purple-500 text-white' : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={selectedServices.includes(srv.id)}
                        onChange={() => handleServiceToggle(srv.id)}
                        className="mt-1 accent-purple-500"
                      />
                      <div className="flex justify-between w-full text-xs font-medium">
                        <span>{srv.name}</span>
                        <span className="text-purple-400 font-bold ml-2 shrink-0">{srv.price ? `${srv.price} ₽/шт` : 'Отдельно'}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ШАГ 5: Тип упаковки */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-lg">Выберите формат индивидуальной упаковки</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-2">
                  {packagings.map((pkg) => (
                    <label 
                      key={pkg.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none text-xs ${
                        formData.packagingId === pkg.id ? 'bg-purple-600/10 border-purple-500 text-white' : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio"
                          name="packaging"
                          checked={formData.packagingId === pkg.id}
                          onChange={() => handleFormChange('packagingId', pkg.id)}
                          className="accent-purple-500"
                        />
                        <span>{pkg.name}</span>
                      </div>
                      <span className="text-purple-400 font-bold shrink-0">{pkg.price ? `${pkg.price} ₽/шт` : 'Договорная'}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ШАГ 6: Финал */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-bold text-lg">Маркировка и логистика забора</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Выберите необходимые типы маркировок и точку забора груза</p>
                </div>

                {/* Под-блок: Маркировка */}
                <div className="space-y-2">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Маркировки:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {markings.map((mrk) => (
                      <label key={mrk.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#13131c] border border-[#252538] text-xs text-gray-300">
                        <input 
                          type="checkbox"
                          checked={formData.markingIds.includes(mrk.id)}
                          onChange={() => {
                            const updated = formData.markingIds.includes(mrk.id) ? formData.markingIds.filter(id => id !== mrk.id) : [...formData.markingIds, mrk.id];
                            handleFormChange('markingIds', updated);
                          }}
                          className="accent-purple-500"
                        />
                        <span>{mrk.name} ({mrk.price ? `${mrk.price} ₽` : 'дог.'})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Под-блок: Откуда забирать */}
                <div className="space-y-2">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Точка забора груза (логистика экспедитора):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {extras.pickupLocations?.map((loc) => (
                      <label key={loc.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[#13131c] border border-[#252538] text-xs text-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="pickupFinal"
                            checked={formData.pickupLocationId === loc.id}
                            onChange={() => handleFormChange('pickupLocationId', loc.id)}
                            className="accent-purple-500"
                          />
                          <span>{loc.name}</span>
                        </div>
                        <span className="text-purple-400 font-bold">{loc.price ? `+${loc.price} ₽` : '0 ₽'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-[#252538]/40" />

                {/* Расчёт сметы */}
                <div className="p-4 rounded-xl bg-purple-600/5 border border-purple-500/20 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Предварительный расчёт сметы:</span>
                    <div className="text-2xl font-black text-purple-400 tracking-tight mt-0.5">
                      {isEstimated ? 'от ' : ''}{total.toLocaleString('ru-RU')} <span className="text-sm font-bold">₽</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 max-w-sm leading-snug">
                    В смету включены складские работы, упаковка и маркировка под партию объемом <span className="text-white font-bold">{formData.quantity} шт.</span>
                  </div>
                </div>

                {/* Поля контактов и кнопка сохранения */}
                <CalcUserContacts 
                  clientData={clientData}
                  onChange={(f, v) => setClientData(prev => ({ ...prev, [f]: v }))}
                  onSubmit={handleSubmitLead}
                  isSending={isSending}
                  status={statusMsg}
                />
              </div>
            )}

          </div>

          {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ */}
          <div className="mt-8 pt-4 border-t border-[#252538]/40 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} /> Назад
            </button>

            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(prev + 1, 6))}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-md shadow-purple-600/10 cursor-pointer"
              >
                Далее <ArrowRight size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 size={14} /> Финальный шаг
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CalcPage;