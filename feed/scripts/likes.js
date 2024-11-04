export function initializeLikes() {
    const likeIcons = document.querySelectorAll('.like-icon');

    likeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const likeCountElement = icon.nextElementSibling; // Находим элемент с количеством лайков
            let likeCount = parseInt(likeCountElement.textContent.split(' ')[0]); // Извлекаем текущее количество лайков

            // Проверяем, был ли лайк уже поставлен
            if (icon.classList.contains('liked')) {
                likeCount--; // Уменьшаем счетчик лайков
                icon.classList.remove('liked'); // Убираем класс лайка
                icon.textContent = '❤️'; // Изменяем иконку обратно на "не лайкнуто"
            } else {
                likeCount++; // Увеличиваем счетчик лайков
                icon.classList.add('liked'); // Добавляем класс лайка
                icon.textContent = '💔'; // Изменяем иконку на "лайкнуто"
            }

            likeCountElement.textContent = `${likeCount} Мне нравится`; // Обновляем текст с количеством лайков
        });
    });
}
