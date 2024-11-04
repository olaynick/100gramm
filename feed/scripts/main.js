import { initializeDescriptions } from './description.js';
import { initializeComments } from './comments.js';
import { initializeLikes } from './likes.js';

document.querySelectorAll('.post').forEach(post => {
    initializeDescriptions(post);
    initializeComments(post);
});

document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        initializeDescriptions(post); // Инициализация описаний
    });
    
    initializeLikes(); // Инициализация лайков
});

