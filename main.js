/* переход между окнами для регистрации и логирования */
const ToLogLink = document.getElementById('to-log');
const ToRegLink = document.getElementById('to-reg');


/* окна */
const loginWindow = document.getElementById('LoginWindow');
const RegWindow = document.getElementById('RegWindow');
const MainWindow = document.getElementById('MainWindow');
const TransferWindow = document.getElementById('TransferWindow');


/* инпуты */
const login = document.getElementById('login');
const password = document.getElementById('password');
const createPassword = document.getElementById('CreatePassword');
const createLogin = document.getElementById('CreateLogin');
const amount = document.getElementById('amount');
const loginRecipient = document.getElementById('loginRecipient');


/* Кнопки */
const ButtonLogin = document.getElementById('LoginButton');
const ButtonRegister = document.getElementById('RegisterButton');
const Buttonlogout = document.getElementById('LogoutButton');
const ButtonTransfer = document.getElementById('transfer');
const ButtonSend = document.getElementById('send');
const ButtonStory = document.getElementById('story');


/* Лейблы */
const LogErrors = document.getElementById('LogError');
const RegErrors = document.getElementById('RegError');
const balanceUser = document.getElementById('Balance-user');
const transferErrors = document.getElementById('transferError');


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
    balance: 100
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
    if(login.value == UserDB.login && password.value == UserDB.password)
    {
        RegWindow.classList.add('hidden');
        loginWindow.classList.add('hidden');
        MainWindow.classList.remove('hidden');
        updateUI();

        sessionStorage.setItem('activeUser', JSON.stringify(UserDB));
    }
    else
    {
        LogErrors.innerText = "Пароль или Логин введенны неверно";
        LogErrors.style.color = "red";
    }
    
    
});

Buttonlogout.addEventListener('click', (e) => {

    MainWindow.classList.add('hidden');
    loginWindow.classList.remove('hidden');
    if(!TransferWindow.classList.contains('hidden')){
        TransferWindow.classList.add('hidden');
    }

    login.value = "";
    password.value = "";
    
    LogErrors.innerText = "";
    RegErrors.innerText = "";
});


ButtonTransfer.addEventListener('click', (e) => {
    TransferWindow.classList.toggle('show');
});

ButtonSend.addEventListener('click', (e) => {
    const amounts = parseFloat(amount.value);
    const loginRecipients = loginRecipient.value;

    if(amounts <= UserDB.balance){
        UserDB.balance -= amounts;
        transferErrors.innerText = "Перевод прошёл удачно!";
        transferErrors.style.color = "green";
        updateUI();
        
        amount.value = "";
        loginRecipient.value = "";
        setTimeout(()=> {
            TransferWindow.classList.toggle('show');
            transferErrors.style.color = "";
            transferErrors.innerText = "";
        }, 1500)

    }
    else{
        transferErrors.innerText = "Ошибка перевода";
        transferErrors.style.color = "red";
    }

});
