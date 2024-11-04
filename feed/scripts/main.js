import { initializeDescriptions } from './description.js';
import { initializeComments } from './comments.js';
import { initializeLikes } from './likes.js';
import { initializeFooter } from './footer.js'; // Импортируем функцию

document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');

    // Инициализация описаний и комментариев с обработкой ошибок
    posts.forEach(post => {
        try {
            initializeDescriptions(post); // Инициализация описаний
            initializeComments(post); // Инициализация комментариев
        } catch (error) {
            console.error(`Ошибка инициализации для поста: ${post.id}`, error);
        }
    });

    try {
        initializeLikes(); // Инициализация лайков
    } catch (error) {
        console.error('Ошибка инициализации лайков', error);
    }

    try {
        initializeFooter(); // Инициализация футера
    } catch (error) {
        console.error('Ошибка инициализации футера', error);
    }
});
