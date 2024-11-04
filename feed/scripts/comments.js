export function initializeComments(post) {
    const sendCommentButton = post.querySelector('.send-comment');
    const commentInput = post.querySelector('.comment-input');
    const commentsContainer = post.querySelector('.comments-container');
    const showCommentsButton = post.querySelector('.show-comments-button');
    const showMoreButton = commentsContainer.querySelector('.show-more-comments-button');

    // Проверка наличия всех необходимых элементов
    if (!sendCommentButton || !commentInput || !commentsContainer || !showCommentsButton || !showMoreButton) {
        console.warn('Не все элементы комментариев найдены в посте', post);
        return;
    }

    sendCommentButton.addEventListener('click', () => {
        addComment(commentInput, commentsContainer);
    });

    showCommentsButton.addEventListener('click', () => {
        toggleComments(commentsContainer, showCommentsButton);
    });

    // Инициализация видимости комментариев
    updateCommentsVisibility(commentsContainer);
}

function addComment(input, container) {
    if (input.value.trim() !== "") {
        const commentText = input.value;
        const comment = createCommentElement(commentText);
        container.appendChild(comment);
        input.value = '';
        updateCommentsVisibility(container); // Обновляем видимость комментариев после добавления
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

function updateCommentsVisibility(container) {
    const comments = container.querySelectorAll('.comment');
    const showMoreButton = container.querySelector('.show-more-comments-button');

    // Скрываем все комментарии, кроме первых трех
    comments.forEach((comment, index) => {
        if (index < 3) {
            comment.style.display = 'block';
        } else {
            comment.style.display = 'none';
        }
    });

    // Проверяем, нужно ли показывать кнопку "Еще"
    if (comments.length > 3) {
        showMoreButton.style.display = 'block';
        showMoreButton.textContent = 'Еще';
    } else {
        showMoreButton.style.display = 'none';
    }
}

function toggleComments(container, button) {
    const comments = container.querySelectorAll('.comment');
    const showMoreButton = container.querySelector('.show-more-comments-button');

    if (showMoreButton.textContent === 'Еще') {
        comments.forEach((comment, index) => {
            if (index >= 3) {
                comment.style.display = 'block'; // Показываем все комментарии
                // Если комментарий длиннее 20 символов, показываем полный текст
                comment.textContent = comment.dataset.fullText; // Показываем полный текст комментария
            }
        });
        showMoreButton.textContent = 'Скрыть';
    } else {
        comments.forEach((comment, index) => {
            if (index >= 3) {
                comment.style.display = 'none'; // Скрываем комментарии, кроме первых трех
                // Скрываем длинные комментарии, показываем только предварительный текст
                comment.textContent = comment.dataset.fullText.substring(0, 20) + '...'; // Показываем краткий текст
            }
        });
        showMoreButton.textContent = 'Еще';
    }
}
