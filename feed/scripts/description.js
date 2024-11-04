export function initializeDescriptions(post) {
    const description = post.querySelector('.description');
    const showMoreButton = post.querySelector('.show-more');

    // Проверка наличия элементов описания и кнопки "Показать больше"
    if (!description || !showMoreButton) {
        console.warn('Элементы описания или кнопки "Показать больше" не найдены в посте', post);
        return;
    }

    const fullDescription = description.textContent;
    
    // Проверка на пустое описание
    if (fullDescription.length === 0) {
        console.warn('Описание пустое в посте', post);
        return;
    }

    description.setAttribute('data-full-description', fullDescription);

    // Сокращаем описание, если оно длиннее 40 символов
    let shortDescription = fullDescription.length > 40 ? fullDescription.substring(0, 40) + '...' : fullDescription;
    description.textContent = shortDescription;

    showMoreButton.addEventListener('click', () => {
        toggleDescription(description, showMoreButton, shortDescription, fullDescription);
    });
}

function toggleDescription(description, button, shortDescription, fullDescription) {
    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        description.textContent = shortDescription;
        button.textContent = 'Показать полностью';
    } else {
        description.classList.add('expanded');
        description.textContent = fullDescription;
        button.textContent = 'Скрыть';
    }
}
