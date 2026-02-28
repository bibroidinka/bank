const ToLogLink = document.getElementById('to-log');
const ToRegLink = document.getElementById('to-reg');

const loginWindow = document.getElementById('LoginWindow');
const RegWindow = document.getElementById('RegWindow');
const MainWindow = document.getElementById('MainWindow');

const login = document.getElementById('login');
const password = document.getElementById('password');
const createPassword = document.getElementById('CreatePassword')
const createLogin = document.getElementById('CreateLogin');

const ButtonLogin = document.getElementById('LoginButton');
const ButtonRegister = document.getElementById('RegisterButton');
const logout = document.getElementById('LogoutButton');

const LogErrors = document.getElementById('LogError');
const RegErrors = document.getElementById('RegError');
const balanceUser = document.getElementById('Balance-user');


ToLogLink.addEventListener('click', (e) => {
    e.preventDefault();
    RegWindow.classList.add('hidden');
    loginWindow.classList.remove('hidden');
});

ToRegLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginWindow.classList.add('hidden');
    RegWindow.classList.remove("hidden");
});

let UserDB = {
    login: "",
    password: "",
    balance: 0
};

function updateUI() {
    const balanceDisplay = document.getElementById('Balance-user');
    const welcomeDisplay = document.getElementById('Welcome-user');

    if (balanceDisplay) {
        balanceDisplay.innerText = `${UserDB.balance} $`;
    }
    
    if (welcomeDisplay) {
        welcomeDisplay.innerText = `Личный кабинет: ${UserDB.login}`;
    }
}


const sessionData = sessionStorage.getItem('activeUser');

if (sessionData) {

    UserDB = JSON.parse(sessionData);
    
    loginWindow.classList.add('hidden');
    MainWindow.classList.remove('hidden');
    updateUI();
}


ButtonRegister.addEventListener('click', (e) => {
    UserDB.login = createLogin.value;
    const passwords = createPassword.value;
    if(passwords.length >= 6)
    {
        UserDB.password = passwords;
        UserDB.balance = 0;
        RegWindow.classList.add('hidden');
        loginWindow.classList.add('hidden');
        MainWindow.classList.remove('hidden');
        updateUI();
        sessionStorage.setItem('activeUser', JSON.stringify(UserDB));

    }
    else{
        RegErrors.innerText= "Пароль должен быть длинее 6 символов";
        RegErrors.style.color = "red";
    }
});


ButtonLogin.addEventListener('click', (e) => {
    if(login == UserDB.login && password == UserDB.password)
    {
        UserDB.balance = 0;
        RegWindow.classList.add('hidden');
        loginWindow.classList.add('hidden');
        MainWindow.classList.remove('hidden');
        updateUI();
    }
    else
    {
        LogErrors.innerText = "Пароль или Логин введенны неверно";
        LogErrors.style.color = "red";
    }
    
    
});

logout.addEventListener('click', (e) => {
    sessionStorage.clear();

    UserDB = {
        login: "",
        password: "",
        balance: 0
    };

    MainWindow.classList.add('hidden');
    loginWindow.classList.remove('hidden');

    login.value = "";
    password.value = "";
    
    LogErrors.innerText = "";
    RegErrors.innerText = "";
});