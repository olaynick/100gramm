function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const verificationForm = document.getElementById('verification-form');

    if (loginForm.classList.contains('hidden')) {
        // Если форма авторизации скрыта, показываем её и скрываем остальные
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        verificationForm.classList.add('hidden');
    } else {
        // Если форма авторизации видима, скрываем её и показываем форму регистрации
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        verificationForm.classList.add('hidden');
    }
}

function login() {
    // Здесь можно добавить проверку данных
    window.location.href = '../feed/index.html'; // Редирект на главную страницу
}

function register() {
    // Здесь можно добавить проверку данных
    const registerForm = document.getElementById('register-form');
    const verificationForm = document.getElementById('verification-form');

    // Скрываем форму регистрации и показываем форму ввода кода подтверждения
    registerForm.classList.add('hidden');
    verificationForm.classList.remove('hidden');
}

function verifyCode() {
    const inputs = document.querySelectorAll('.code-input');
    let enteredCode = '';

    // Собираем введенный код из полей ввода
    inputs.forEach(input => {
        enteredCode += input.value;
    });

    const correctCode = '123456'; // Ожидаемый код
    const errorMessage = document.getElementById('error-message');

    // Проверяем код
    if (enteredCode === correctCode) {
        errorMessage.classList.add('hidden'); // Скрываем сообщение об ошибке
        // Выполняем редирект на главную страницу
        window.location.href = '../feed/index.html'; // Редирект на главную страницу
    } else {
        errorMessage.classList.remove('hidden'); // Показываем сообщение об ошибке

        // Очищаем поля ввода кода
        inputs.forEach(input => {
            input.value = ''; // Очищаем значение каждого поля
        });

        // Устанавливаем фокус на первое поле ввода
        inputs[0].focus();
    }
}

// Инициализация: показываем только форму авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const verificationForm = document.getElementById('verification-form');

    registerForm.classList.add('hidden'); // Скрываем форму регистрации
    verificationForm.classList.add('hidden'); // Скрываем форму кода подтверждения

    // Инициализация логики ввода кода подтверждения
    const codeInputs = document.querySelectorAll('.code-input');

    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Проверяем, что введено число от 0 до 9
            if (this.value.match(/^[0-9]$/)) {
                // Переключаем фокус на следующее поле
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            } else {
                // Если введено что-то не то, очищаем поле
                this.value = '';
            }

            // Проверяем, заполнены ли все поля
            if (Array.from(codeInputs).every(input => input.value.match(/^[0-9]$/))) {
                // Если все поля заполнены, вызываем функцию проверки кода
                verifyCode();
            }
        });

        // Обработка нажатий клавиш
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace') {
                // Если находимся в первом поле, просто очищаем его
                if (index === 0) {
                    this.value = '';
                } else {
                    // Если не первое поле, переходим к предыдущему полю и очищаем его
                    this.value = ''; // Очищаем текущее поле
                    codeInputs[index - 1].focus(); // Устанавливаем фокус на предыдущее поле
                }
                event.preventDefault(); // Предотвращаем стандартное поведение
            }
        });
    });
});
