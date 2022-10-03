// account logic
// show modal logic
let registerUserModalBtn = document.querySelector('#registerUser-modal');
let loginUserModalBtn = document.querySelector('#loginUser-modal');
let registerUserModalBlock = document.querySelector('#registerUser-block');
let loginUserModalBlock = document.querySelector('#loginUser-block');
let registerUserBtn = document.querySelector('#registerUser-btn');
let loginUserBtn = document.querySelector('#loginUser-btn');
let logoutUserBtn = document.querySelector('#logoutUser-btn');

registerUserModalBtn.addEventListener('click', () => {
    registerUserModalBlock.setAttribute('style', 'display: block !important!;');
    registerUserBtn.setAttribute('style', 'display: block;');
    loginUserModalBlock.setAttribute('style', 'display: none !important;');
    loginUserBtn.setAttribute('style', 'display: none;');
});

loginUserModalBtn.addEventListener('click', () => {
    registerUserModalBlock.setAttribute('style', 'display: none !important;');
    registerUserBtn.setAttribute('style', 'display: none;');
    loginUserModalBlock.setAttribute('style', 'display: block !important;');
    loginUserBtn.setAttribute('style', 'display: block;');
});

// register logic
// npx json-server -w db.json -p 8000
const USERS_API = 'http://localhost:8000/users';

// inputs group
let usernameInp = document.querySelector('#reg-username');
let ageInp = document.querySelector('#reg-age');
let passwordInp = document.querySelector('#reg-password');
let passwordConfirmInp = document.querySelector('#reg-passwordConfirm');
let isAdminInp = document.querySelector('#isAdmin');

async function checkUniqueUserName(userName){
    let res = await fetch(USERS_API);
    let users = await res.json();
    return users.some(item => item.username === userName);
};

async function registerUser(){
    if(
        !usernameInp.value.trim() ||
        !ageInp.value.trim() ||
        !passwordInp.value.trim() ||
        !passwordConfirmInp.value.trim()
    ){
        alert('Some inputs are empty!');
        return;
    };

    let uniqueUsername = await checkUniqueUserName(usernameInp.value);

    if(uniqueUsername){
        alert('User with this username already exists!');
        return;
    };

    if(passwordInp.value !== passwordConfirmInp.value){
        alert('Passwords don\'t match!');
        return;
    };

    let userObj = {
        username: usernameInp.value,
        age: ageInp.value,
        password: passwordInp.value,
        isAdmin: isAdminInp.checked
    };

    fetch(USERS_API, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });

    alert('Registered successfully!');

    usernameInp.value = '';
    ageInp.value = '';
    passwordInp.value = '';
    passwordConfirmInp.value = '';
    isAdminInp.checked = false;
};

registerUserBtn.addEventListener('click', registerUser);
