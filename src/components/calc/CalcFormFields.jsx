import React from 'react';

export function CalcFormFields({ 
  config, 
  formData, 
  onChange, 
  selectedServices, 
  onServiceToggle, 
  services, 
  packagings, 
  markings, 
  extras 
}) {
  return (
    <div className="space-y-8">
      {/* Шаг 1: Маркетплейс и Тип товара */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Выбор Маркетплейса</label>
          <select 
            value={formData.marketplace} 
            onChange={(e) => onChange('marketplace', e.target.value)}
            className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">-- Выберите площадку --</option>
            {config.marketplaces?.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Тип товара</label>
          <select 
            value={formData.productType} 
            onChange={(e) => onChange('productType', e.target.value)}
            className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">-- Категория товара --</option>
            {config.productTypes?.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Шаг 2: Название и Количество */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Название товара или ссылка</label>
          <input 
            type="text"
            value={formData.productName}
            onChange={(e) => onChange('productName', e.target.value)}
            placeholder="Укажите название товара или ссылку на карточку маркетплейса"
            className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Количество (штук)</label>
          <input 
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => onChange('quantity', parseInt(e.target.value) || 0)}
            className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Шаг 3: Габариты и Срочность */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Размер товара</label>
          <select 
            value={formData.size} 
            onChange={(e) => onChange('size', e.target.value)}
            className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-xs focus:outline-none focus:border-purple-500 transition-colors"
          >
            {config.sizes?.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2.5">Приоритет обработки</label>
          <select 
            value={formData.priority} 
            onChange={(e) => onChange('priority', e.target.value)}
            className="w-full bg-[#13131c] border border-[#252538] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          >
            {config.priorities?.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <hr className="border-[#252538]/40" />

      {/* Шаг 4: Основные складские услуги (Множественный выбор) */}
      <div>
        <label className="block text-purple-400 text-xs font-extrabold uppercase tracking-widest mb-4">Какие услуги нужны? (выберите нужные)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((srv) => (
            <label 
              key={srv.id} 
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                selectedServices.includes(srv.id)
                  ? 'bg-purple-600/10 border-purple-500 text-white'
                  : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
              }`}
            >
              <input 
                type="checkbox"
                checked={selectedServices.includes(srv.id)}
                onChange={() => onServiceToggle(srv.id)}
                className="mt-1 accent-purple-500"
              />
              <div className="flex justify-between w-full text-xs font-medium">
                <span>{srv.name}</span>
                <span className="text-purple-400 font-bold ml-2 shrink-0">{srv.price ? `${srv.price} ₽/шт` : 'Договорная'}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Шаг 5: Тип упаковки (Одиночный выбор) */}
      <div>
        <label className="block text-purple-400 text-xs font-extrabold uppercase tracking-widest mb-4">Тип упаковки</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {packagings.map((pkg) => (
            <label 
              key={pkg.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none text-xs ${
                formData.packagingId === pkg.id
                  ? 'bg-purple-600/10 border-purple-500 text-white'
                  : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="radio"
                  name="packaging"
                  checked={formData.packagingId === pkg.id}
                  onChange={() => onChange('packagingId', pkg.id)}
                  className="accent-purple-500"
                />
                <span>{pkg.name}</span>
              </div>
              <span className="text-purple-400 font-bold shrink-0">{pkg.price ? `${pkg.price} ₽/шт` : 'Договорная'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Шаг 6: Требования к маркировке (Множественный выбор) */}
      <div>
        <label className="block text-purple-400 text-xs font-extrabold uppercase tracking-widest mb-4">Требования к маркировке</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {markings.map((mrk) => (
            <label 
              key={mrk.id} 
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                formData.markingIds.includes(mrk.id)
                  ? 'bg-purple-600/10 border-purple-500 text-white'
                  : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
              }`}
            >
              <input 
                type="checkbox"
                checked={formData.markingIds.includes(mrk.id)}
                onChange={() => {
                  const updated = formData.markingIds.includes(mrk.id)
                    ? formData.markingIds.filter(id => id !== mrk.id)
                    : [...formData.markingIds, mrk.id];
                  onChange('markingIds', updated);
                }}
                className="mt-1 accent-purple-500"
              />
              <div className="flex justify-between w-full text-xs font-medium">
                <span>{mrk.name}</span>
                <span className="text-purple-400 font-bold ml-2 shrink-0">{mrk.price ? `${mrk.price} ₽/шт` : 'Договорная'}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Шаг 7: Дополнительные услуги (Чекбоксы, фиксированные в ТЗ по подбору) */}
      <div>
        <label className="block text-purple-400 text-xs font-extrabold uppercase tracking-widest mb-4">Дополнительные услуги</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {extras.extraServices?.map((ext) => (
            <label 
              key={ext.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                formData.extraServiceIds.includes(ext.id)
                  ? 'bg-purple-600/10 border-purple-500 text-white'
                  : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
              }`}
            >
              <input 
                type="checkbox"
                checked={formData.extraServiceIds.includes(ext.id)}
                onChange={() => {
                  const updated = formData.extraServiceIds.includes(ext.id)
                    ? formData.extraServiceIds.filter(id => id !== ext.id)
                    : [...formData.extraServiceIds, ext.id];
                  onChange('extraServiceIds', updated);
                }}
                className="mt-1 accent-purple-500"
              />
              <div className="flex justify-between w-full text-xs font-medium">
                <span>{ext.name}</span>
                <span className="text-gray-500 font-bold ml-2 shrink-0">По запросу</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Шаг 8: Логистика (Откуда забрать) */}
      <div>
        <label className="block text-purple-400 text-xs font-extrabold uppercase tracking-widest mb-4">Откуда нужно забрать товар?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {extras.pickupLocations?.map((loc) => (
            <label 
              key={loc.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none text-xs ${
                formData.pickupLocationId === loc.id
                  ? 'bg-purple-600/10 border-purple-500 text-white'
                  : 'bg-[#13131c]/60 border-[#252538] text-gray-400 hover:border-[#383854]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="radio"
                  name="pickup"
                  checked={formData.pickupLocationId === loc.id}
                  onChange={() => onChange('pickupLocationId', loc.id)}
                  className="accent-purple-500"
                />
                <span>{loc.name}</span>
              </div>
              <span className="text-purple-400 font-bold shrink-0">
                {loc.price === null ? 'Индивидуально' : loc.price === 0 ? '0 ₽' : `+${loc.price} ₽`}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}