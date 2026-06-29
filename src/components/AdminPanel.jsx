import React, { useState, useEffect } from 'react';
import { Lock, Save, RefreshCw, FileCode, CheckCircle, Users, Settings, Phone, Calendar, Briefcase, DollarSign, Trash2 } from 'lucide-react';

function AdminPanel() {
  // 1. Авторизация
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Глобальные вкладки панели управления: 'editor' (Редактор JSON) или 'leads' (Заявки клиентов)
  const [activeTab, setActiveTab] = useState('editor');

  // 2. Полный список управляемых файлов (Контент + Калькулятор)
  const filesList = [
    { name: 'discounts.json', label: 'Еженедельные скидки' },
    { name: 'news.json', label: 'Новости Wildberries' },
    { name: 'reviews.json', label: 'Отзывы клиентов' },
    // Базы данных калькулятора
    { name: 'calcStepsData.json', label: '🎛️ Кальк: Шаги и категории' },
    { name: 'servicesPrice.json', label: '💼 Кальк: Стоимость услуг' },
    { name: 'packagingPrice.json', label: '📦 Кальк: Стоимость упаковки' },
    { name: 'markingPrice.json', label: '🏷️ Кальк: Цены на маркировку' },
    { name: 'extraPrice.json', label: '🚚 Кальк: Логистика и допы' },
  ];
  
  const [currentFile, setCurrentFile] = useState('discounts.json');
  const [jsonContent, setJsonContent] = useState('');
  const [leads, setLeads] = useState([]); 
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Проверка логина
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'alexander' && password === '13062026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Неверный логин или пароль');
    }
  };

  // Загрузка выбранного JSON файла из папки public
// 1. Исправленная загрузка контента файлов
  const loadFileContent = async (filename) => {
    try {
      const response = await fetch(`/api/data/${filename}?t=${Date.now()}`);
      const data = await response.json();
      setJsonContent(JSON.stringify(data, null, 2));
      showStatus('Файл успешно загружен', 'success');
    } catch (err) {
      showStatus('Ошибка загрузки файла сервера', 'error');
    }
  };

  // 2. Исправленная загрузка обращений клиентов
  const loadLeadsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data/leadsData.json?t=${Date.now()}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setLeads(data.sort((a, b) => b.id - a.id));
      } else {
        setLeads([]);
      }
    } catch (err) {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. Исправленное удаление лида (убрали localhost:5002)
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту заявку?')) return;

    try {
      const response = await fetch('/api/delete-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId }),
      });

      const result = await response.json();
      if (result.success) {
        setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
        showStatus('Заявка успешно удалена', 'success');
      } else {
        showStatus('Ошибка сервера при удалении', 'error');
      }
    } catch (err) {
      showStatus('Не удалось связаться с сервером', 'error');
    }
  };

  // 4. Исправленное сохранение JSON (убрали localhost:5002)
  const handleSave = async () => {
    try {
      const parsedData = JSON.parse(jsonContent);

      const response = await fetch('/api/save-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: currentFile,
          data: parsedData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        showStatus('Изменения успешно сохранены!', 'success');
      } else {
        showStatus('Ошибка сервера при сохранении', 'error');
      }
    } catch (err) {
      showStatus('Ошибка: Невалидный синтаксис JSON!', 'error');
    }
  };

  const showStatus = (text, type) => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage({ text: '', type: '' }), 4000);
  };

  // --- ЭКРАН ВХОДА И АВТОРИЗАЦИИ ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090e] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0f0f17] border border-[#252538] rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Lock size={22} />
            </div>
            <h1 className="text-white text-2xl font-black tracking-tight">Панель управления</h1>
            <p className="text-gray-500 text-xs mt-1">Доступ только для администратора</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Логин</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#141420] border border-[#252538] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" 
                placeholder="Введи логин"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Пароль</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#141420] border border-[#252538] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" 
                placeholder="••••••••"
                required
              />
            </div>

            {authError && <p className="text-rose-500 text-xs font-medium">{authError}</p>}

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm mt-2 shadow-lg shadow-purple-600/10 cursor-pointer">
              Войти в систему
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ОСНОВНОЙ РАБОЧИЙ ЭКРАН АДМИНКИ ---
  return (
    <div className="min-h-screen bg-[#09090e] text-white flex flex-col font-sans">
      {/* Шапка админки */}
      <header className="bg-[#0f0f17] border-b border-[#252538] px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <h1 className="text-lg font-black tracking-tight uppercase">Alexfull Studio Admin</h1>
        </div>

        {/* Переключатель разделов: Редактор баз / Карточки лидов */}
        <div className="flex bg-[#141420] p-1 rounded-xl border border-[#252538]">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'editor' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings size={14} /> Редактор баз данных
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'leads' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users size={14} /> Обращения клиентов
          </button>
        </div>

        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="text-xs text-gray-400 hover:text-white border border-[#252538] px-3 py-1.5 rounded-lg bg-[#141420] transition-colors cursor-pointer self-start sm:self-auto"
        >
          Выйти
        </button>
      </header>

      {/* Контент в зависимости от выбранной вкладки */}
      <div className="flex-grow flex flex-col lg:flex-row">
        
        {/* ВТИСНУТАЯ ВКЛАДКА 1: СТАНДАРТНЫЙ JSON-РЕДАКТОР С ДОП. ФАЙЛАМИ */}
        {activeTab === 'editor' && (
          <>
            {/* Сайдбар выбора файлов */}
            <aside className="w-full lg:w-80 bg-[#0f0f17] border-r border-[#252538] p-6 space-y-2 shrink-0">
              <div className="text-gray-500 text-[10px] font-extrabold uppercase tracking-widest mb-4">Доступные базы данных</div>
              {filesList.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setCurrentFile(file.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    currentFile === file.name 
                      ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-600/10' 
                      : 'bg-[#13131c] border-[#252538] text-gray-400 hover:text-white hover:border-[#383854]'
                  }`}
                >
                  <FileCode size={16} />
                  {file.label}
                </button>
              ))}
            </aside>

            {/* Зона текстового редактора */}
            <main className="flex-grow p-6 flex flex-col justify-between bg-[#09090e]">
              <div className="w-full flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-400">
                    Редактирование: <span className="text-purple-400 font-mono font-bold">{currentFile}</span>
                  </div>
                  <button 
                    onClick={() => loadFileContent(currentFile)}
                    className="p-2 text-gray-400 hover:text-white bg-[#0f0f17] border border-[#252538] rounded-xl transition-colors cursor-pointer"
                    title="Перезагрузить файл"
                  >
                    <RefreshCw size={15} />
                  </button>
                </div>

                <div className="relative flex-grow min-h-[450px] rounded-2xl border border-[#252538] overflow-hidden bg-[#0f0f17]">
                  <textarea
                    value={jsonContent}
                    onChange={(e) => setJsonContent(e.target.value)}
                    className="w-full h-full p-5 bg-[#0f0f17] text-emerald-400 font-mono text-sm leading-relaxed resize-none focus:outline-none"
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Нижняя информационная статус-панель */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-[#252538]/40">
                <div>
                  {statusMessage.text && (
                    <div className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border ${
                      statusMessage.type === 'success' 
                        ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' 
                        : 'text-rose-400 bg-rose-500/5 border-rose-500/20'
                    }`}>
                      <CheckCircle size={14} />
                      {statusMessage.text}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-purple-600/10 cursor-pointer"
                >
                  <Save size={16} />
                  Сохранить изменения в файл
                </button>
              </div>
            </main>
          </>
        )}

        {/* ВТИСНУТАЯ ВКЛАДКА 2: ОБРАЩЕНИЯ КЛИЕНТОВ (МЕНЕДЖЕР ЗАЯВОК + УДАЛЕНИЕ) */}
        {activeTab === 'leads' && (
          <main className="flex-grow p-6 md:p-8 bg-[#09090e] w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black uppercase tracking-wide text-white">Входящие расчеты с калькулятора</h2>
                <p className="text-xs text-gray-500 mt-1">Интерактивный просмотр лидов из базы данных leadsData.json</p>
              </div>
              <button
                onClick={loadLeadsData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f0f17] border border-[#252538] text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Обновить заявки
              </button>
            </div>

            {/* Всплывающие уведомления статуса удаления внутри вкладки лидов */}
            {statusMessage.text && (
              <div className={`mb-4 flex items-center gap-2 text-xs font-bold px-4 py-3 rounded-xl border max-w-sm ${
                statusMessage.type === 'success' ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' : 'text-rose-400 bg-rose-500/5 border-rose-500/20'
              }`}>
                <CheckCircle size={14} />
                {statusMessage.text}
              </div>
            )}

            {loading ? (
              <div className="text-center py-20 text-gray-500 text-sm font-medium">Загрузка базы обращений...</div>
            ) : leads.length === 0 ? (
              <div className="text-center py-20 text-gray-500 border border-dashed border-[#252538] rounded-2xl text-sm">
                Заявок с калькулятора пока не поступало или все были успешно отработаны и удалены.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {leads.map((lead) => (
                  <div 
                    key={lead.id || Math.random()} 
                    className="bg-[#0f0f17] border border-[#252538] rounded-2xl p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-xl relative overflow-hidden group"
                  >
                    <div>
                      {/* Шапка карточки */}
                      <div className="flex justify-between items-start border-b border-[#252538]/50 pb-3 mb-4">
                        <div>
                          <h3 className="text-white font-black text-base tracking-tight">{lead.client?.name || 'Имя не указано'}</h3>
                          <a 
                            href={`tel:${lead.client?.phone}`} 
                            className="text-purple-400 hover:text-purple-300 font-bold text-xs flex items-center gap-1.5 mt-1 transition-colors"
                          >
                            <Phone size={12} />
                            {lead.client?.phone || 'Телефон отсутствует'}
                          </a>
                        </div>
                        
                        {/* Календарная дата и кнопка удаления */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono bg-[#141420] px-2 py-1 border border-[#252538] rounded-lg">
                            <Calendar size={10} />
                            {lead.date || 'Дата скрыта'}
                          </div>
                          
                          {/* Уникальная кнопка КОРЗИНЫ */}
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                            title="Удалить лид из базы данных"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Детализация заказа */}
                      <div className="space-y-2.5 text-xs text-gray-400 mb-4">
                        <div className="flex items-start gap-2">
                          <Briefcase size={14} className="text-gray-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-gray-300">Интеграция:</span> {lead.calcDetails?.marketplace} — <span className="text-purple-400 font-medium">{lead.calcDetails?.productType}</span>
                          </div>
                        </div>
                        
                        <div className="pl-5 space-y-1 text-[11px] text-gray-500 border-l border-[#252538] ml-1.5">
                          <div><span className="text-gray-400">Наименование:</span> {lead.calcDetails?.productName || 'Не указано'}</div>
                          <div><span className="text-gray-400">Объем партии:</span> <span className="text-white font-bold">{lead.calcDetails?.quantity} шт.</span></div>
                          <div><span className="text-gray-400">Класс габаритов:</span> Размер {lead.calcDetails?.size}</div>
                        </div>

                        <div className="text-[11px] bg-[#141420] p-2 rounded-lg border border-[#252538]/60 space-y-0.5">
                          <div><span className="text-gray-500">Выбранные услуги:</span> <span className="text-gray-300 font-mono">{lead.calcDetails?.servicesSelected?.length > 0 ? lead.calcDetails.servicesSelected.join(', ') : 'нет'}</span></div>
                          <div><span className="text-gray-500">Упаковка (ID):</span> <span className="text-gray-300 font-mono">{lead.calcDetails?.packagingId || 'нет'}</span></div>
                        </div>
                      </div>

                      {/* Текстовое примечание */}
                      {lead.client?.comment && (
                        <div className="p-3 bg-[#141420] rounded-xl border border-[#252538]/60 text-xs text-gray-400 italic mb-4 leading-relaxed">
                          &ldquo;{lead.client.comment}&rdquo;
                        </div>
                      )}
                    </div>

                    {/* Финальная стоимость сметы */}
                    <div className="pt-3 border-t border-[#252538]/50 flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-500">
                        <DollarSign size={12} /> Итог расчета:
                      </div>
                      <span className="text-base font-black text-emerald-400 bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/20 rounded-xl">
                        {lead.calculatedPrice}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </main>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;