import React from 'react';

export function CalcUserContacts({ clientData, onChange, onSubmit, isSending, status }) {
  return (
    <div className="mt-8 p-6 rounded-2xl bg-[#13131c] border border-[#252538] space-y-4">
      <h3 className="text-white font-bold text-base mb-2">Оформить расчет и отправить менеджеру</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-500 text-[11px] font-bold uppercase mb-1.5">Ваше Имя</label>
          <input 
            type="text"
            required
            value={clientData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Иван Иванович"
            className="w-full bg-[#0f0f17] border border-[#252538] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-500 text-[11px] font-bold uppercase mb-1.5">Номер телефона</label>
          <input 
            type="tel"
            required
            value={clientData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+7 (999) 000-00-00"
            className="w-full bg-[#0f0f17] border border-[#252538] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-500 text-[11px] font-bold uppercase mb-1.5">Комментарий к заказу</label>
        <textarea 
          value={clientData.comment}
          onChange={(e) => onChange('comment', e.target.value)}
          placeholder="Особые пожелания к сборке или поставке..."
          className="w-full bg-[#0f0f17] border border-[#252538] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 h-24 resize-none"
        />
      </div>

      {status && (
        <p className={`text-xs font-bold ${status.includes('успешно') ? 'text-emerald-400' : 'text-rose-400'}`}>
          {status}
        </p>
      )}

      <button
        onClick={onSubmit}
        disabled={isSending}
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-xl transition-all text-sm tracking-wide shadow-lg shadow-purple-600/10 cursor-pointer disabled:opacity-50"
      >
        {isSending ? 'Сохранение расчета...' : 'Рассчитать и зафиксировать стоимость'}
      </button>
    </div>
  );
}