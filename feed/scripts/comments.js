export function initializeComments(post) {
    const sendCommentButton = post.querySelector('.send-comment');
    const commentInput = post.querySelector('.comment-input');
    const commentsContainer = post.querySelector('.comments-container');
    const commentsList = commentsContainer.querySelector('.comments-list');
    const showMoreContainer = commentsContainer.querySelector('.show-more-container');
    const showMoreButton = showMoreContainer.querySelector('.show-more-comments-button');

    // Проверка наличия всех необходимых элементов
    if (!sendCommentButton || !commentInput || !commentsContainer || !showMoreButton) {
        console.warn('Не все элементы комментариев найдены в посте', post);
        return;
    }

    sendCommentButton.addEventListener('click', () => {
        addComment(commentInput, commentsList, showMoreContainer);
    });

    showMoreButton.addEventListener('click', () => {
        toggleComments(commentsList, showMoreButton);
    });

    // Инициализация видимости комментариев
    updateCommentsVisibility(commentsList, showMoreContainer);
}

function addComment(input, commentsList, showMoreContainer) {
    if (input.value.trim() !== "") {
        const commentText = input.value;
        const comment = createCommentElement(commentText);
        commentsList.appendChild(comment); // Добавляем комментарий в список
        input.value = '';
        updateCommentsVisibility(commentsList, showMoreContainer); // Обновляем видимость комментариев после добавления
    }
}

function createCommentElement(text) {
    const comment = document.createElement('div');
    comment.classList.add('comment');

    // Ограничиваем длину комментария до 20 символов
    const previewText = text.length > 20 ? text.substring(0, 20) + '...' : text;
    comment.textContent = previewText;
    comment.dataset.fullText = text; // Сохраняем полный текст комментария

    return comment;
}

function updateCommentsVisibility(commentsList, showMoreContainer) {
    const comments = commentsList.querySelectorAll('.comment');

    // Условие 1: Если комментариев 0
    if (comments.length === 0) {
        const noCommentsMessage = document.createElement('div');
        noCommentsMessage.classList.add('no-comments-message');
        noCommentsMessage.textContent = "Пока нет комментариев";
        commentsList.appendChild(noCommentsMessage);
        showMoreContainer.style.display = 'none';
        return;
    } else {
        const noCommentsMessage = commentsList.querySelector('.no-comments-message');
        if (noCommentsMessage) {
            noCommentsMessage.remove(); // Удаляем сообщение, если комментарии есть
        }
    }

    // Условие 2: Если комментариев от 1 до 3
    if (comments.length >= 1 && comments.length <= 3) {
        comments.forEach(comment => {
            const fullText = comment.dataset.fullText;
            comment.style.display = 'block'; // Показываем все комментарии
            comment.textContent = fullText.length > 20 ? fullText.substring(0, 20) + '...' : fullText; // Сокращаем, если нужно
        });
        showMoreContainer.style.display = 'none'; // Скрываем кнопку
        return;
    }

    // Условие 3: Если комментариев от 4 до 10
    if (comments.length >= 4 && comments.length <= 10) {
        comments.forEach((comment, index) => {
            const fullText = comment.dataset.fullText;
            if (index < 3) {
                comment.style.display = 'block'; // Показываем первые 3 комментария
                comment.textContent = fullText.length > 20 ? fullText.substring(0, 20) + '...' : fullText; // Сокращаем, если нужно
            } else {
                comment.style.display = 'none'; // Скрываем остальные
            }
        });
        showMoreContainer.style.display = 'inline'; // Показываем контейнер для кнопки "Показать больше"
        return;
    }

    // Условие 4: Если комментариев больше 10
    if (comments.length > 10) {
        comments.forEach((comment, index) => {
            const fullText = comment.dataset.fullText;
            if (index < 10) {
                comment.style.display = 'block'; // Показываем первые 10 комментариев
                comment.textContent = fullText.length > 20 ? fullText.substring(0, 20) + '...' : fullText; // Сокращаем, если нужно
            } else {
                comment.style.display = 'none'; // Скрываем остальные
            }
        });
        showMoreContainer.style.display = 'block'; // Показываем контейнер для кнопки "Показать больше"
    }
}



function toggleComments(commentsList, button) {
    const comments = commentsList.querySelectorAll('.comment');
    const allCommentsVisible = Array.from(comments).every(comment => comment.style.display === 'block');

    if (button.textContent === 'Показать больше' || !allCommentsVisible) {
        comments.forEach((comment, index) => {
            if (index >= 3) {
                comment.style.display = 'block'; // Показываем скрытые комментарии
                comment.textContent = comment.dataset.fullText; // Показываем полный текст комментария
            }
        });
        button.textContent = 'Скрыть'; // Меняем текст кнопки на "Скрыть"
    } else {
        comments.forEach((comment, index) => {
            if (index >= 3) {
                comment.style.display = 'none'; // Скрываем комментарии, начиная с 4-го
                comment.textContent = comment.dataset.fullText.substring(0, 20) + '...'; // Показываем краткий текст
            }
        });
        button.textContent = 'Показать больше'; // Меняем текст кнопки на "Показать больше"
    }
}

