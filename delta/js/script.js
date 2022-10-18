const password_ele = document.getElementById("pwd_txt");
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
var pwd_length = document.getElementById("slider");
const pwEl = document.getElementById("pw");

const digits = document.getElementById("Digits");
const alphabetsElement = document.getElementById("Alphabets");
const upperCaseLetters = document.getElementById("uppercaseletters");
const specialCharactersElement = document.getElementById("SpecialCharacters");
let strengthOfPassword = document.getElementById('strength')


var alphabets = "abcdefghijklmnopqrstuvwxyz";
var upperCaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var specialCharacters = "!@$%^&()_+=";

let strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
let mediumPassword = new RegExp('^(?=.*[A-z])(?=.*[0-9])');
let mediumPasswordSmallAlphabets = new RegExp('^(?=.*[A-Z])(?=.*[0-9])');


function getAlphabets() {
    return alphabets[Math.floor(Math.random() * alphabets.length)];
}

function getUpperCaseLetters() {
    return upperCaseAlphabets[Math.floor(Math.random() * upperCaseAlphabets.length)];
}

function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSpecialCharacters() {
    return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
}

function generatePassword() {
    const len = pwd_length.value;

    let password = "";

    if(alphabetsElement.checked || upperCaseLetters.checked || digits.checked || specialCharactersElement.checked ){

    if (alphabetsElement.checked) {
        password += getAlphabets();
    }

    if (upperCaseLetters.checked) {
        password += getUpperCaseLetters();
    }

    if (digits.checked) {
        password += getNumbers();
    }

    if (specialCharactersElement.checked) {
        password += getSpecialCharacters();
    }

    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }
}
    return password;
}

function generateX() {
    const xs = [];

    if (alphabetsElement.checked) {
        xs.push(getAlphabets());
    }

    if (upperCaseLetters.checked) {
        xs.push(getUpperCaseLetters());
    }

    if (digits.checked) {
        xs.push(getNumbers());
    }

    if (specialCharactersElement.checked) {
        xs.push(getSpecialCharacters());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}

generate.addEventListener('click', () => {
    let password = generatePassword();
    console.log(password);
    if(password!=""){
        console.log(strongPassword.test(password));
        if(strongPassword.test(password)) {
            strengthOfPassword.style.backgroundColor = "green";
            strengthOfPassword.textContent = 'Strong';
            password_ele.innerText = password;
        } else if(mediumPassword.test(password)||mediumPasswordSmallAlphabets.test(password)){
            strengthOfPassword.style.backgroundColor = 'blue';
            strengthOfPassword.textContent = 'Medium';
            password_ele.innerText = password;
        } else{
            strengthOfPassword.style.backgroundColor = 'red';
            strengthOfPassword.textContent = 'Weak';
            password_ele.innerText = password;
        }
    }else {
        alert("Please Select Atleast One Checkbox");
    }
});


clipboard.addEventListener('click', () => {
  navigator.clipboard.writeText(password_ele.innerText);
});
