export function initializeFooter() {
    const footer = document.querySelector('footer');
    
    // Изначально скрываем футер
    footer.style.display = 'none';
    footer.style.opacity = '0';

    let lastScrollY = window.scrollY; // Текущая позиция прокрутки

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Проверяем, достигнута ли нижняя часть страницы
        if (currentScrollY + window.innerHeight >= document.body.offsetHeight) {
            if (footer.style.display === 'none') {
                footer.style.display = 'flex'; // Показываем футер
                setTimeout(() => {
                    footer.style.opacity = '1'; // Показать футер с плавным переходом
                }, 10); // Небольшая задержка для активации перехода
            }
        } else {
            // Скрываем футер, если прокручиваем вверх
            if (currentScrollY < lastScrollY && footer.style.display === 'flex') {
                footer.style.opacity = '0'; // Скрываем футер с плавным переходом
                setTimeout(() => {
                    footer.style.display = 'none'; // Скрываем футер после завершения анимации
                }, 300); // Задержка для завершения анимации
            }
        }

        lastScrollY = currentScrollY; // Обновляем позицию прокрутки
    });

    // Обработчик клика на футер для прокрутки вверх
    footer.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    });
}

// Вызываем функцию инициализации футера при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeFooter);
