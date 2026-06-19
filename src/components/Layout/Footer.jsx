import { FaTelegramPlane } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#13131c]">
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Верхний ряд */}
        <div className="grid md:grid-cols-2 gap-y-3 gap-x-12 text-gray-300 text-sm">

          <a
            href="tel:+79652528852"
            className="hover:text-white transition-colors"
          >
            📞 +7 (965) 252-88-52
          </a>

          <a
            href="tel:+79162528852"
            className="hover:text-white transition-colors"
          >
            📞 +7 (916) 252-88-52
          </a>

          <a
            href="mailto:ALEXFULLFILMENT@YANDEX.RU"
            className="hover:text-white transition-colors"
          >
            ✉️ ALEXFULLFILMENT@YANDEX.RU
          </a>

          <span>
            📍 г. Балашиха
          </span>

        </div>

        {/* Разделитель */}
        <div className="h-px bg-gray-800 my-5" />

        {/* Нижний ряд */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="text-xs text-gray-500">
            © 2026 AlexFull. Все права защищены.
          </div>

          <div className="flex gap-3">

            <a
              href="https://t.me/alexfull_msk"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-[#1d1d2b]
                hover:bg-[#27273a]
                transition-colors
              "
            >
              <FaTelegramPlane className="text-[#9359ff]" />
              <span className="text-white text-sm">
                AlexFull
              </span>
            </a>

            <a
              href="https://t.me/kingseller_msk"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-[#1d1d2b]
                hover:bg-[#27273a]
                transition-colors
              "
            >
              <FaTelegramPlane className="text-[#9359ff]" />
              <span className="text-white text-sm">
                KingSeller
              </span>
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;