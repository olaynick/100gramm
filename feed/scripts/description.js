export function initializeDescriptions(post) {
    const description = post.querySelector('.description');
    const fullDescription = description.textContent;

    // Проверка на пустое описание
    if (fullDescription.length === 0) {
        console.warn('Описание пустое в посте', post);
        return;
    }

    description.setAttribute('data-full-description', fullDescription);

    // Сокращаем описание, если оно длиннее 40 символов
    let shortDescription = fullDescription.length > 40 ? fullDescription.substring(0, 40) + '...' : fullDescription;
    description.innerHTML = shortDescription; // Используем innerHTML для добавления ссылки

    // Добавляем ссылку "Показать полностью"
    const showMoreLink = document.createElement('a');
    showMoreLink.href = '#'; // Устанавливаем ссылку
    showMoreLink.className = 'show-more';
    showMoreLink.textContent = ' Показать полностью'; // Текст ссылки
    description.appendChild(showMoreLink); // Добавляем ссылку в описание

    showMoreLink.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке
        toggleDescription(description, showMoreLink, shortDescription, fullDescription);
    });
}

function toggleDescription(description, link, shortDescription, fullDescription) {
    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        description.innerHTML = shortDescription; // Используем innerHTML для обновления текста
        description.appendChild(link); // Добавляем ссылку обратно
        link.textContent = ' Показать полностью'; // Обновляем текст ссылки
    } else {
        description.classList.add('expanded');
        description.innerHTML = fullDescription; // Полное описание
        link.textContent = ' Скрыть'; // Обновляем текст ссылки
    }
}
