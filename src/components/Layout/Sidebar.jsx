import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaTelegramPlane } from 'react-icons/fa';

function Sidebar({ isOpen, onToggle }) {
  if (!isOpen) return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-40 bg-purple-600 hover:bg-purple-700 rounded-lg p-2 shadow-lg"
      >
        <Menu size={24} />
      </button>
    </>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 w-64 h-screen bg-[#13131c] border-r border-gray-800 flex flex-col p-6 z-30">
        <button
          onClick={onToggle}
          className="absolute top-6 right-6 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="mb-12">
          <img src="/images/logo.png" alt="AlexFull Logo" className="w-48" />
        </div>

        <nav className="flex-grow space-y-6">
          <Link to="/" className="block text-gray-400 hover:text-accentPurple transition-colors uppercase text-sm font-medium">
            01 <br />
            Главная
          </Link>
          <Link to="/about" className="block text-gray-400 hover:text-accentPurple transition-colors uppercase text-sm font-medium">
            02 <br />
            О нас
          </Link>
          <Link to="/calc" className="block text-gray-400 hover:text-accentPurple transition-colors uppercase text-sm font-medium">
            03 <br />
            Калькулятор
          </Link>
        </nav>

        <a
          href="https://t.me/alexfull_ff"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-[#1d1d2b]
            hover:bg-[#27273a]
            transition-colors
            cursor-pointer
            "
        >
          <FaTelegramPlane className="text-[#9359ff]" />
          <span className="text-white text-sm">
            Наш ТГ-канал
          </span>
        </a>
        <a
          href="https://t.me/murik_un"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-[#1d1d2b]
            hover:bg-[#27273a]
            transition-colors
            cursor-pointer
            "
        >
          <FaTelegramPlane className="text-[#9359ff]" />
          <span className="text-white text-sm">
            Создание Сайта
          </span>
        </a>
      </aside>
    </>
  );
}

export default Sidebar;