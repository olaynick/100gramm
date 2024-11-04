export function initializeComments(post) {
    const sendCommentButton = post.querySelector('.send-comment');
    const commentInput = post.querySelector('.comment-input');
    const commentsContainer = post.querySelector('.comments-container');
    const showCommentsButton = post.querySelector('.show-comments-button');

    sendCommentButton.addEventListener('click', () => {
        addComment(commentInput, commentsContainer, showCommentsButton);
    });

    showCommentsButton.addEventListener('click', () => {
        toggleComments(commentsContainer, showCommentsButton);
    });
}

function addComment(input, container, button) {
    if (input.value.trim() !== "") {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.textContent = input.value;
        container.appendChild(comment);
        input.value = '';
        button.style.display = 'block';
    }
}

function toggleComments(container, button) {
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        button.textContent = 'Скрыть комментарии';
    } else {
        container.style.display = 'none';
        button.textContent = 'Комментарии';
    }
}
