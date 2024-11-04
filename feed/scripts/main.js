import { initializeDescriptions } from './description.js';
import { initializeComments } from './comments.js';
import { initializeLikes } from './likes.js';

document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        initializeDescriptions(post); // Инициализация описаний
        initializeComments(post); // Инициализация комментариев
    });
    initializeLikes(); // Инициализация лайков
});
