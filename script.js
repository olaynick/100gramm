// Функция для получения списка веток
async function fetchBranches() {
    const response = await fetch('https://api.github.com/repos/ваш-логин/ваш-репозиторий/branches');
    const branches = await response.json();
    const branchesList = document.getElementById('branches-list');

    branches.forEach(branch => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="https://github.com/ваш-логин/ваш-репозиторий/tree/${branch.name}">${branch.name}</a>`;
        branchesList.appendChild(li);
    });
}

// Вызов функции для получения веток
fetchBranches();
