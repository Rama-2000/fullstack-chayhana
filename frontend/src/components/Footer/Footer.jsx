import { assets } from "../../assets/assets/frontend_assets/assets";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Чайхана №1 Султан</h3>
          <p>
            Мы рады приветствовать вас в нашей чайхане! У нас вы найдёте лучшие
            блюда восточной кухни, приготовленные с любовью и традициями.
          </p>
          <div className="footer-social-icons">
            <a href="https://vk.com/chayhanan1sultan" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/145/145813.png" alt="VK" />
            </a>
            <a
              href="https://instagram.com/chayhanan1sultan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png" alt="Instagram" />
            </a>
            <a
              href="https://t.me/chayhanan1sultan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Telegram_Messenger.png/800px-Telegram_Messenger.png" alt="Facebook" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Контакты</h3>
          <ul>
            <li>
              <strong>Адрес:</strong> г. Новосибирск, ​Проспект Карла Маркса, 28 к1
            </li>
            <li>
              <strong>Телефон:</strong>{" "}
              <a href="tel:+79231300808">+7 (923) 130-08-08</a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:chayhanan1sultan@gmail.com">chayhanan1sultan@gmail.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Часы работы</h3>
          <ul>
            <li>Пн-Пт: 10:00 - 22:00</li>
            <li>Сб-Вс: 11:00 - 23:00</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Навигация</h3>
          <ul>
            <li>
              <a href="/">Главная</a>
            </li>
            <li>
              <a href="#">Меню</a>
            </li>
            <li>
              <a href="#">О нас</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li>
            <li>
              <a href="#">Контакты</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2024 Чайхана №1 Султан. Все права защищены.
        </p>
        <p>
          Разработано с ❤️ командой <a href="/">Чайхана №1 Султан</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;