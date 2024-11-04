// Функция для получения списка веток
async function fetchBranches() {
    const response = await fetch('https://api.github.com/repos/olaynick/100gramm/branches');
    const branches = await response.json();
    const branchesList = document.getElementById('branches-list');

    branches.forEach(branch => {
        const li = document.createElement('li');
        // Изменяем ссылку на index.html для выбранной ветки
        li.innerHTML = `<a href="branches/${branch.name}/index.html">${branch.name}</a>`;
        branchesList.appendChild(li);
    });
}

// Вызов функции для получения веток
fetchBranches();
