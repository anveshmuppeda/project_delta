var input = document.getElementById("passWord");
var lowercaseletter = document.getElementById("lowercase");
var uppercaseletter = document.getElementById("uppercase");
var number = document.getElementById("number");
var length = document.getElementById("length");
var spclcharacter=document.getElementById("specialcharacter");
let state = false;

var upperCaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var specialCharacters = "!@#$%^&*?_~<>";
var numbersWithZero = "01234567890";
var lowercaseletterFlag=false,uppercaseletterFlag=false,numberFlag=false,spclcharacterFlag=false,sequentialInputScore=0;
  // Validate lowercase letters
var lowerCaseLetters = /[a-z]/g;
  // Validate capital letters
  var uppercase = /[A-Z]/g;
  var numbersCheck = /[0-9]/g;
  var spclchars= /[!,%,&,@,#,$,^,*,?,_,~,>,<]/g;



//show the Info
  document.getElementById("info").style.display = "block";

function passwordVisibility(){
    if(state){
        state = false;
        document.getElementById("passWord").setAttribute("type","password");
    }else{
        state = true;
        document.getElementById("passWord").setAttribute("type","text")
    }
}

function showPassword(show){
    show.classList.toggle("fa-eye-slash");
}

// When the user starts to type something inside the password field
input.onkeyup = function() {


  if(input.value.match(lowerCaseLetters)) { 
    lowercaseletterFlag=true; 
    lowercaseletter.classList.remove("invalid");
    lowercaseletter.classList.add("valid");
  } else {
    lowercaseletter.classList.remove("valid");
    lowercaseletter.classList.add("invalid");
  }
  

  if(input.value.match(uppercase)) { 
    uppercaseletterFlag=true; 
    uppercaseletter.classList.remove("invalid");
    uppercaseletter.classList.add("valid");
  } else {
    uppercaseletter.classList.remove("valid");
    uppercaseletter.classList.add("invalid");
  }

  // Validate numbers
  if(input.value.match(numbersCheck)) {  
    numberFlag=true;
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
// Validate special characters
  if(input.value.match(spclchars)) {
    spclcharacterFlag=true;  
    spclcharacter.classList.remove("invalid");
    spclcharacter.classList.add("valid");
  } else {
    spclcharacter.classList.remove("valid");
    spclcharacter.classList.add("invalid");
  }

  // Validate length
  if(input.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }

}


var button= document.getElementById("strengthOfPassword");

button.onclick =function(){
  console.log("Start of Onclick Main Function");
  var pwd = document.getElementById("passWord").value;
  console.log("Password Value is"+pwd);
  len = pwd.length;
  console.log("Length is"+len);
  var uniqPass=getUniqueValuesOfPassword(pwd);
 
  console.log("Array is "+uniqPass);
  debugger;
  var scorebar = document.getElementById('passwordMetrics');
  var comp = "";
  
  if (len == 0) {
    scorebar.style.backgroundPosition = '0px 0px';
    comp = "Please Enter Password";
  }
  else {
    var sequentialInputScores=0,finalScore=0;
    scr = parseInt(getPwdScore(uniqPass,len));
    console.log("scr is "+scr);
    sequentialInputScores=getSequentialInput(pwd);
    console.log("sequentialInputScores is "+sequentialInputScores);
    finalScore=scr-sequentialInputScores;
    console.log("finalScore is "+finalScore);
    if(finalScore >= 90) {
      scorebar.style.backgroundPosition = '0px -30px';
      comp = "Very Strong";
    }
    else if(finalScore >= 70) {
      scorebar.style.backgroundPosition = '0px -24px';
      comp = "Strong";
    }
    else if(finalScore >= 50) {
      scorebar.style.backgroundPosition = '0px -18px';
      comp = "Good";
    }
    else if(finalScore >= 30) {
      scorebar.style.backgroundPosition = '0px -12px';
      comp = "Weak";
    }
    else if(finalScore >= 0) {
      scorebar.style.backgroundPosition = '0px -6px';
      comp = "Very Weak";
    }
  }
  console.log("End of Onclick Main Function");
  document.getElementById('complexity').innerHTML = comp;
  return false;
}

function getPwdScore(strPassword,len) {
  console.log("Start of getPwdScore()");
  debugger;
  // Reset combination count
  var nScore = 0,nLowerCount=0,nUpperCount=0,nNumberCount=0,nCharacterCount=0;
  console.log("String Password length = "+strPassword.length);

   // Password length
  // -- 8 or more
 if(len > 7){
  nScore += 10;
  console.log("nScore is "+nScore);
}
else{
  nScore+=5;
  console.log("strPassword is "+strPassword.length+"nScore is "+nScore);
}

  // Letters
  if(uppercaseletterFlag){
  nUpperCount = countContain(strPassword, upperCaseAlphabets);
  }
  if(lowercaseletterFlag){
  nLowerCount = countContain(strPassword, lowerCaseAlphabets);
  }
  console.log("Upper Count is "+nUpperCount);
  console.log("Lower Count is "+nLowerCount);

  // -- Letters are all lower case
  if (nUpperCount == 0 && nLowerCount != 0) {
    nScore += 10;
    console.log("Lower Cases nScore is "+nScore);
  }
  else if(nLowerCount == 0 && nUpperCount != 0){
    nScore += 10;
    console.log("UpperCase nScore is "+nScore);
  }
  else if(nLowerCount != 0 && nUpperCount !=0){
    nScore += 20;
    console.log("Both L and U nScore is "+nScore);
  }

  // Numbers
  if(numberFlag){
  nNumberCount = countContain(strPassword, numbers);
  }
  console.log("Number Count "+nNumberCount);
  // -- 1 number
  if (nNumberCount != 0) {
    nScore += 10;
    console.log("Numbers nScore is "+nScore);
  }

  // Characters
  if(spclcharacterFlag){
  nCharacterCount = countContain(strPassword, specialCharacters);
  }
  console.log("nCharacterCount  "+nCharacterCount);
  // -- 1 character
  if (nCharacterCount != 0) {
    nScore += 10;
    console.log(" SpecialCharacter nScore is "+nScore);
  }
 // -- Mixed case letters, numbers, and characters
 if (nNumberCount != 0 && nUpperCount != 0 && nLowerCount != 0
  && nCharacterCount != 0) {
nScore += 40;
console.log(" All nScore is "+nScore);
}
// -- Letters, numbers, and characters
else if (nNumberCount != 0 && nUpperCount != 0 && nCharacterCount != 0 || nNumberCount != 0 && nLowerCount != 0 && nCharacterCount != 0 || 
  nNumberCount != 0 && nLowerCount != 0 && nUpperCount != 0 ||  nNumberCount != 0 && nCharacterCount != 0 && nUpperCount != 0 ) {
  nScore += 30; 
  console.log(" Three Comb nScore is "+nScore);
}
  // nLowerCount != 0 && nUpperCount !=0 here this condition is excluded as we checked this condition previously 168
 else if (nNumberCount != 0 && nLowerCount != 0|| nNumberCount != 0 && nUpperCount != 0 || nNumberCount != 0 && nCharacterCount != 0 ||
    nCharacterCount !=0 && nLowerCount != 0 ||  nCharacterCount !=0 && nUpperCount != 0) {
    nScore += 20;
    console.log("Two combinations nScore is "+nScore);
  }
  console.log("End of getPwdScore()");
  return nScore;
}

// Checks a string for a list of characters
function countContain(strPassword, strCheck) {
  console.log("Starting of countContain()");
  // Declare variables
  var nCount = 0;

  for (i = 0; i < strPassword.length; i++) {
    if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
      if(strPassword[i])
      nCount++;
    }
  }
  console.log("Input Data Count of "+strCheck+" is "+nCount);
  console.log("End of countContain()");
  return nCount;
}


function getUniqueValuesOfPassword(password){
  console.log("Starting of getUniqueValuesOfPassword()");
  var uniqueArray = [];
  // Loop through array values
  for(i=0; i < password.length; i++){
      if(uniqueArray.indexOf(password[i]) === -1) {
          uniqueArray.push(password[i]);
      }
  }
  var uniqString=uniqueArray.toString();
  console.log("Unique String Value"+uniqString);
  console.log("End of getUniqueValuesOfPassword()");
  return uniqString;
}

function getSequentialInput(pwd){
  console.log("Starting of getSequentialInput()");
	const onlyUpperCaseAlphabets = pwd.replace(/[^A-Z]/g, '');
	const onlyLowerCaseAlphabets = pwd.replace(/[^a-z]/g, '');
	const onlyNumbers = pwd.replace(/[^0-9]/g, '');
	const onlyspecial=pwd.replace(/[^!,%,&,@,#,$,^,*,?,_,~,>,<]/g,'');
  console.log("onlyNumbers is "+onlyNumbers);
  console.log("onlyspecial is "+onlyspecial);
  console.log("onlyUpperCaseAlphabets "+onlyUpperCaseAlphabets);
  console.log("onlyLowerCaseAlphabets "+onlyLowerCaseAlphabets);
	var forwardString,reverseString, i;
  debugger;
  sequentialInputScore=0;
  console.log("sequentialInputScore initially is "+sequentialInputScore);
	for (i=0; i < 23; i++) {
			forwardString = upperCaseAlphabets.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyUpperCaseAlphabets.indexOf(forwardString) != -1 || onlyUpperCaseAlphabets.indexOf(reverseString) != -1) {
				sequentialInputScore += 10;
        console.log(" Inside If sequentialInputScore"+sequentialInputScore);
				}
		}
    console.log(" upperCaseAlphabets sequentialInputScore is"+sequentialInputScore);
		for (i=0; i < 23; i++) {
			forwardString = lowerCaseAlphabets.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyLowerCaseAlphabets.indexOf(forwardString) != -1 || onlyLowerCaseAlphabets.indexOf(forwardString) != -1) {
				sequentialInputScore += 10;
				}
		}
    console.log(" lowerCaseLetters sequentialInputScore is"+sequentialInputScore);
		/* Check for sequential numeric string patterns (forward and reverse) */
		for (i=0; i < 8; i++) {
			forwardString = numbersWithZero.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyNumbers.indexOf(forwardString) != -1 || onlyNumbers.indexOf(reverseString) != -1) {
        console.log("entered into numbers if condition");
				sequentialInputScore += 10;
				}
		}
    console.log(" numbers sequentialInputScore is"+sequentialInputScore);
    debugger;
		/* Check for sequential symbol string patterns (forward and reverse) */
		for (i=0; i < 13; i++) {
			forwardString = specialCharacters.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyspecial.indexOf(forwardString) != -1 || onlyspecial.indexOf(reverseString) != -1) { 
				sequentialInputScore += 10;
			}
		}
    debugger;
    console.log(" specialCharacter sequentialInputScore is"+sequentialInputScore);
    debugger;
    console.log("End of getSequentialInput()");
    return sequentialInputScore;
	}


