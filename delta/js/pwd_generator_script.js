
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
const passwordLength = document.getElementById("slider");
const passwordElement = document.getElementById("passwordText");

const digits = document.getElementById("Digits");
const alphabetsElement = document.getElementById("lowerCaseLetters");
const upperCaseLetters = document.getElementById("uppercaseletters");
const specialCharactersElement = document.getElementById("SpecialCharacters");
let strengthOfPassword = document.getElementById('strength');


var alphabets = "abcdefghijklmnopqrstuvwxyz";
var upperCaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var specialCharacters = "!@$%^&()_+=";

let strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+^()_!@$\$%\^&\*])(?=.{8,})');
let mediumPassword = new RegExp("^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$");
let mediumPasswordWithSmallAlphabets = new RegExp("^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$");
let mediumPasswordWithBoth = new RegExp("^(?=.*[A-Za-z0-9])");


function getUpperCaseAlphabets() {
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
    const lengthOfPassword = passwordLength.value;

    let password = "";

    if(alphabetsElement.checked || upperCaseLetters.checked || digits.checked || specialCharactersElement.checked ){

    if (alphabetsElement.checked) {
        password += getUpperCaseAlphabets();
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

    for (let i = password.length; i < lengthOfPassword; i++) {
        const x = generateFinalPassword();
        password += x;
    }
}
    return password;
}

function generateFinalPassword() {
    const emptyArray = [];

    if (alphabetsElement.checked) {
        emptyArray.push(getUpperCaseAlphabets());
    }

    if (upperCaseLetters.checked) {
        emptyArray.push(getUpperCaseLetters());
    }

    if (digits.checked) {
        emptyArray.push(getNumbers());
    }

    if (specialCharactersElement.checked) {
        emptyArray.push(getSpecialCharacters());
    }

    if (emptyArray.length === 0) return "";

    return emptyArray[Math.floor(Math.random() * emptyArray.length)];
}

generate.addEventListener('click', () => {
    let password = generatePassword();
    console.log(password);
    if(password!=""){
        console.log(strongPassword.test(password));
        if(strongPassword.test(password)) {
            strengthOfPassword.style.backgroundColor = "green";
            strengthOfPassword.textContent = 'Strong';
            passwordElement.innerText = password;
        } else if(mediumPassword.test(password)||mediumPasswordWithSmallAlphabets.test(password)|| mediumPasswordWithBoth.test(password)){
            strengthOfPassword.style.backgroundColor = 'blue';
            strengthOfPassword.textContent = 'Medium';
            passwordElement.innerText = password;
        } else{
            strengthOfPassword.style.backgroundColor = 'red';
            strengthOfPassword.textContent = 'Weak';
            passwordElement.innerText = password;
        }
    }else {
        alert("Please Select Atleast One Checkbox");
    }
});


clipboard.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordElement.innerText);
});
