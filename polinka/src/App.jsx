import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Генерируем много сердечек для фона
  const generateHearts = () => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    }));
  };

  const hearts = generateHearts();

  // Удаляем возможные остатки предыдущих вариантов открытки, которые могли
  // остаться в DOM при HMR/горячей перезагрузке и приводить к наложению текста.
  useEffect(() => {
    const oldSelectors = [
      '.greeting-container',
      '.hearts-background',
      '.heart',
      '.card',
      '.floating-elements',
      '.bubble',
      '.card-decoration',
      '.heart-item--legacy'
    ];

    oldSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        try {
          el.remove();
        } catch (e) {
          // ignore
        }
      });
    });

    // Если вдруг в body появились доп. контейнеры вне #root (редкий случай),
    // удалим их, кроме #root, чтобы точно не осталось старого DOM.
    document.querySelectorAll('body > *').forEach((el) => {
      if (el.id !== 'root' && !el.classList.contains('vite-dev-server')) {
        // Не удаляем скрипты и html head элементы — только визуальные блоки
        const tag = el.tagName && el.tagName.toLowerCase();
        if (tag !== 'script' && tag !== 'link' && tag !== 'meta') {
          try { el.remove(); } catch (e) {}
        }
      }
    });
  }, []);

  return (
    <div className="container">
      {/* Фон из сердечек */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart-item"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.size}px`,
              animation: `heartFloat ${heart.duration}s infinite ease-in-out`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Главная открытка */}
      <div className={`card-wrapper ${isFlipped ? 'flipped' : ''}`}>
        {/* Передняя часть */}
        <div className="card-front" onClick={() => setIsFlipped(!isFlipped)}>
          <div className="front-content">
            <h1 className="big-text">Полиночка</h1>
            <p className="small-text">Нажми на меня</p>
            <div className="heart-pulse">💝</div>
          </div>
        </div>

        {/* Задняя часть */}
        <div className="card-back" onClick={() => setIsFlipped(!isFlipped)}>
          <div className="back-content">
            <div className="message-box">
              <h2>Дорогая!</h2>
              
              <p className="message-line">
                Знаем, что последние дни были {<span className="stress">*напряженными*</span>}... 😔
              </p>

              <p className="message-line">
                Но вот факты:
              </p>

              <div className="facts">
                <div className="fact">✅ Вы гений всего</div>
                <div className="fact">✅ Ваши шутки помогают нам пережить пары</div>
                <div className="fact">✅ Мы вас уважаем ну оооочень</div>
                <div className="fact">✅ Улыбка - вы ещё прекрасны ✨</div>
                <div className="fact">✅ Когда вы пиздите Салмана и Медияра, вам явно становится лучше</div>
              </div>

              <p className="closer">
                Отдохните, выпейте кофе и помните:<br/>
                <span className="bold-text">Вы — самая классная преподавательница на свете!</span>
              </p>

              <p className="footer">
                Нажми ещё раз, чтобы вернуться 🔄
              </p>
              <p className="footer">С искренней любовью от ТОСк-23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Конфетти эффект */}
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`confetti conf-${(i % 4) + 1}`}></div>
        ))}
      </div>
    </div>
  );
}

export default App;
