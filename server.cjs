const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Путь к папке с живыми данными внутри бэкенда
const PUBLIC_DIR = path.join(__dirname, 'public', 'data');

// МЕГА-ВАЖНО: Открываем доступ на чтение файлов из папки бэкенда
// Теперь любой, кто перейдет по /api/data/news.json, получит живой файл!
app.use('/api/data', express.static(PUBLIC_DIR));

// Эндпоинт для сохранения JSON из админки
app.post('/api/save-json', (req, res ) => {
  const { filename, data } = req.body;
  
  if (!filename || !data) {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  const filePath = path.join(PUBLIC_DIR, filename);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Не удалось записать файл' });
    }
    res.json({ success: true, message: `Файл ${filename} успешно обновлен` });
  });
});

// Эндпоинт для удаления заявки
app.post('/api/delete-lead', (req, res) => {
  const { id } = req.body;
  const filePath = path.join(PUBLIC_DIR, 'leadsData.json'); 

  if (!id) {
    return res.status(400).json({ success: false, message: 'Не указан ID заявки' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Ошибка чтения файла заявок' });
    }

    try {
      let leads = JSON.parse(data);
      if (!Array.isArray(leads)) leads = [];

      const filteredLeads = leads.filter(lead => lead.id !== id);

      fs.writeFile(filePath, JSON.stringify(filteredLeads, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ success: false, message: 'Ошибка записи в файл' });
        }
        res.json({ success: true, message: 'Заявка успешно удалена' });
      });
    } catch (parseErr) {
      res.status(500).json({ success: false, message: 'Ошибка обработки JSON данных' });
    }
  });
});

const PORT = 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер админки запущен на http://0.0.0.0:${PORT}`);
});