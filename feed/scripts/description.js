export function initializeDescriptions(post) {
    const description = post.querySelector('.description');
    const fullDescription = description.textContent;

    description.setAttribute('data-full-description', fullDescription);

    let shortDescription = fullDescription.length > 40 ? fullDescription.substring(0, 40) + '...' : fullDescription;
    description.textContent = shortDescription;

    const showMoreButton = post.querySelector('.show-more');
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
