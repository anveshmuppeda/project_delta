
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
const passwordLength = document.getElementById("slider");
const passwordElement = document.getElementById("passwordText");

const digits = document.getElementById("Digits");
const alphabetsElement = document.getElementById("lowerCaseLetters");
const upperCaseLetters = document.getElementById("uppercaseletters");
const specialCharactersElement = document.getElementById("SpecialCharacters");
let strengthOfPassword = document.getElementById('strength');
//First Letter Start With Below
const initialLetterCapital = document.getElementById("initialCharacterCapital");
const initialLetterLowerCase = document.getElementById("initialCharacterLower");
const initialLetterNumber = document.getElementById("initialCharacterNumber");

var lowerCaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
var upperCaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var specialCharacters = "!@$%^&()_+=";

let strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+^()_!@$\$%\^&\*])(?=.{8,})');
let mediumPassword = new RegExp("^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$");
let mediumPasswordWithSmallAlphabets = new RegExp("^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$");
let mediumPasswordWithBoth = new RegExp("^(?=.*[A-Za-z0-9])");

let randomCounter=1;
let previousRandomValue=1;
const customRandom =(maximum)=>{
    time = new Date().getTime();
    //Added PreviousRandom + 1 as if the random value is 0 then it might throw exception inorder to escape incrementing 
    randomValue = parseInt(((time/randomCounter)/previousRandomValue+1)%maximum);
    randomCounter++;
    previousRandom= randomValue;
    return randomValue;
}

function getLowerCaseAlphabets() {
    return lowerCaseAlphabets[customRandom(lowerCaseAlphabets.length)];
}

function getUpperCaseLetters() {
    return upperCaseAlphabets[customRandom(upperCaseAlphabets.length)];
}

function getNumbers() {
    return numbers[customRandom(numbers.length)];
}

function getSpecialCharacters() {
    return specialCharacters[customRandom(specialCharacters.length)];
}

let generatedPassword = "";

function disableCheckBox(isCheckBox){
    if (initialLetterLowerCase.checked) {
        generatedPassword+=getLowerCaseAlphabets();
        console.log("alphabetsElement ="+generatedPassword);
        initialLetterLowerCase.setAttribute('enabled','');
        initialLetterCapital.setAttribute('disabled','');
        initialLetterNumber.setAttribute('disabled','');
        //document.getElementById("initialLetterCapital").disabled = true;
        //document.getElementById("initialLetterNumber").disabled = true;
    }
    if (initialLetterCapital.checked) {
        generatedPassword+=getUpperCaseLetters();
        console.log("upperCaseLetters ="+generatedPassword);
        initialLetterCapital.setAttribute('enabled','');
        initialLetterNumber.setAttribute('disabled','');
        initialLetterLowerCase.setAttribute('disabled','');
    }
    if (initialLetterNumber.checked) {
        generatedPassword +=getNumbers();
        console.log("digits ="+generatedPassword);
        initialLetterNumber.setAttribute('enabled','');
        initialLetterCapital.setAttribute('disabled','');
        initialLetterLowerCase.setAttribute('disabled','');
     }
}

function generatePassword() {
    const lengthOfPassword = passwordLength.value;
    console.log("lengthOfPassword ="+lengthOfPassword);
    for (let i = generatedPassword.length; i < lengthOfPassword; i++) {
        generatedPassword += generateFinalPassword();
    }
    return generatedPassword;
}

function generateFinalPassword() {
    const passwordArray = [];

    if (alphabetsElement.checked) {
        console.log("passwordArray = "+passwordArray.toString());
        passwordArray.push(getLowerCaseAlphabets());
    }

    if (upperCaseLetters.checked) {
        passwordArray.push(getUpperCaseLetters());
    }

    if (digits.checked) {
        passwordArray.push(getNumbers());
    }

    if (specialCharactersElement.checked) {
        passwordArray.push(getSpecialCharacters());
    }

    if (passwordArray.length === 0) return "";

    return passwordArray[customRandom(passwordArray.length)];
}

generate.addEventListener('click', () => {
    let password = generatePassword();
    console.log(password);
    if(password!=""){
        console.log(strongPassword.test(password));
        if(strongPassword.test(password)) {
            strengthOfPassword.style.backgroundColor = "green";
            passwordElement.innerText = password;
        } else if(mediumPassword.test(password)||mediumPasswordWithSmallAlphabets.test(password)|| mediumPasswordWithBoth.test(password)){
            strengthOfPassword.style.backgroundColor = 'blue';
            passwordElement.innerText = password;
        } else{
            strengthOfPassword.style.backgroundColor = 'red';
            passwordElement.innerText = password;
        }
    }else {
        alert("Please Select Atleast One Checkbox");
    }
});


clipboard.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordElement.innerText);
});