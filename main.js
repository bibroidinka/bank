/* ===== ПЕРЕХОДЫ МЕЖДУ ОКНАМИ ===== */
const ToLogLink = document.getElementById('to-log');
const ToRegLink = document.getElementById('to-reg');

/* окна */
const loginWindow = document.getElementById('LoginWindow');
const RegWindow = document.getElementById('RegWindow');
const MainWindow = document.getElementById('MainWindow');
const TransferWindow = document.getElementById('TransferWindow');
const overlay = document.getElementById('overlay');
const StoryWindows = document.getElementById('StoryWindow');

/* инпуты */
const login = document.getElementById('login');
const password = document.getElementById('password');
const createPassword = document.getElementById('CreatePassword');
const createLogin = document.getElementById('CreateLogin');
const amount = document.getElementById('amount');
const loginRecipient = document.getElementById('loginRecipient');

/* кнопки */
const ButtonLogin = document.getElementById('LoginButton');
const ButtonRegister = document.getElementById('RegisterButton');
const Buttonlogout = document.getElementById('LogoutButton');
const ButtonTransfer = document.getElementById('transfer'); // кнопка в быстрых действиях
const ButtonTransferFab = document.getElementById('nav-transfer-fab'); // FAB в нижнем навбаре
const ButtonCloseTransfer = document.getElementById('close-transfer');
const ButtonSend = document.getElementById('send');
const ButtonStory = document.getElementById('story');

/* пресеты суммы */
const presetBtns = document.querySelectorAll('.preset-btn');

/* лейблы */
const LogErrors = document.getElementById('LogError');
const RegErrors = document.getElementById('RegError');
const balanceUser = document.getElementById('Balance-user');
const transferErrors = document.getElementById('transferError');



function openTransfer() {
    TransferWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            TransferWindow.classList.add('show');
        });
    });
}

function closeTransfer() {
    TransferWindow.classList.remove('show');
    overlay.classList.add('hidden');
    setTimeout(() => {
        TransferWindow.classList.add('hidden');
        amount.value = '';
        loginRecipient.value = '';
        transferErrors.innerText = '';
        presetBtns.forEach(b => b.classList.remove('active'));
    }, 400);
}

function updateUI() {
    const balanceDisplay = document.getElementById('Balance-user');
    const welcomeDisplay = document.getElementById('Welcome-user');
    const avatarEl = document.getElementById('user-avatar-initials');

    if (balanceDisplay) {
        balanceDisplay.innerText = UserDB.balance;
    }
    if (welcomeDisplay) {
        welcomeDisplay.innerText = UserDB.login;
    }
    if (avatarEl && UserDB.login) {
        avatarEl.innerText = UserDB.login.charAt(0).toUpperCase();
    }
}


let UserDB = {
    login: '',
    password: '',
    balance: 100,
    story: []
};

const sessionData = sessionStorage.getItem('activeUser');
if (sessionData) {
    UserDB = JSON.parse(sessionData);
    loginWindow.classList.add('hidden');
    MainWindow.classList.remove('hidden');
    updateUI();
}


ToLogLink.addEventListener('click', (e) => {
    e.preventDefault();
    RegWindow.classList.add('hidden');
    loginWindow.classList.remove('hidden');
});

ToRegLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginWindow.classList.add('hidden');
    RegWindow.classList.remove('hidden');
});


/* ===== РЕГИСТРАЦИЯ ===== */
ButtonRegister.addEventListener('click', () => {
    UserDB.login = createLogin.value.trim();
    const pwd = createPassword.value;

    if (!UserDB.login) {
        RegErrors.innerText = 'Введите логин';
        return;
    }
    if (pwd.length < 6) {
        RegErrors.innerText = 'Пароль должен быть длиннее 6 символов';
        return;
    }

    UserDB.password = pwd;
    RegWindow.classList.add('hidden');
    MainWindow.classList.remove('hidden');
    updateUI();
    sessionStorage.setItem('activeUser', JSON.stringify(UserDB));
});

ButtonLogin.addEventListener('click', () => {
    if (login.value === UserDB.login && password.value === UserDB.password) {
        loginWindow.classList.add('hidden');
        MainWindow.classList.remove('hidden');
        updateUI();
        sessionStorage.setItem('activeUser', JSON.stringify(UserDB));
    } else {
        LogErrors.innerText = 'Неверный логин или пароль';
    }
});


Buttonlogout.addEventListener('click', () => {
    closeTransfer();
    MainWindow.classList.add('hidden');
    loginWindow.classList.remove('hidden');
    login.value = '';
    password.value = '';
    LogErrors.innerText = '';
    RegErrors.innerText = '';
});


ButtonTransfer.addEventListener('click', openTransfer);

if (ButtonTransferFab) {
    ButtonTransferFab.addEventListener('click', openTransfer);
}
if (ButtonCloseTransfer) {
    ButtonCloseTransfer.addEventListener('click', closeTransfer);
}

overlay.addEventListener('click', closeTransfer);


presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        amount.value = btn.dataset.val;
    });
});


ButtonSend.addEventListener('click', () => {
    const amounts = parseFloat(amount.value);
    const recipient = loginRecipient.value.trim();

    if (!recipient) {
        transferErrors.innerText = 'Укажите логин получателя';
        transferErrors.style.color = 'var(--red)';
        return;
    }
    if (!amounts || amounts <= 0) {
        transferErrors.innerText = 'Введите сумму перевода';
        transferErrors.style.color = 'var(--red)';
        return;
    }
    if (amounts > UserDB.balance) {
        transferErrors.innerText = 'Недостаточно средств на счёте';
        transferErrors.style.color = 'var(--red)';
        return;
    }

    UserDB.balance -= amounts;
    UserDB.story += recipient + amounts;
    updateUI();
    sessionStorage.setItem('activeUser', JSON.stringify(UserDB));

    transferErrors.innerText = '✓ Перевод выполнен успешно';
    transferErrors.style.color = 'var(--green)';

    setTimeout(() => {
        closeTransfer();
    }, 1500);
});

ButtonStory.addEventListener('click', () => {
    StoryWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            StoryWindow.classList.add('show');
        });
    });
});

document.getElementById('close-story').addEventListener('click', () => {
    StoryWindow.classList.remove('show');
    overlay.classList.add('hidden');
    setTimeout(() => {
        StoryWindow.classList.add('hidden');
    }, 400);
});

overlay.addEventListener('click', () => {
    // закрываем все открытые шторки
    document.querySelectorAll('.sheet.show').forEach(sheet => {
        sheet.classList.remove('show');
        setTimeout(() => sheet.classList.add('hidden'), 400);
    });
    overlay.classList.add('hidden');
});
