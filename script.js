// Функция для получения списка веток
async function fetchBranches() {
    const response = await fetch('https://api.github.com/repos/olaynick/100gramm/branches');
    const branches = await response.json();
    const branchesList = document.getElementById('branches-list');

    branches.forEach(branch => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="https://olaynick.github.io/100gramm/${branch.name}/index.html">${branch.name}</a>`;
        branchesList.appendChild(li);
    });
}

// Функция для отображения текущей ветки
function displayCurrentBranch() {
    const urlParts = window.location.pathname.split('/'); // Разделяем путь URL
    const currentBranch = urlParts[2]; // Предполагается, что ветка находится на втором уровне пути
    const branchDisplay = document.getElementById('current-branch');

    if (currentBranch) {
        branchDisplay.innerHTML = `<strong>Вы находитесь в ветке:</strong> ${currentBranch}`;
    } else {
        branchDisplay.innerHTML = `<strong>Вы находитесь на главной странице проекта.</strong>`;
    }
}

// Вызов функций
fetchBranches();
displayCurrentBranch();
