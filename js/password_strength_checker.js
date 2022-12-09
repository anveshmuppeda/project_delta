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
  var pwd = document.getElementById("passWord").value;
  len = pwd.length;
  var uniqPass=getUniqueValuesOfPassword(pwd);
  var scorebar = document.getElementById('passwordMetrics');
  var comp = "";
  
  if (len == 0) {
    scorebar.style.backgroundPosition = '0px 0px';
    comp = "Please Enter Password";
  }
  else {
    var sequentialInputScores=0,finalScore=0;
    scr = parseInt(getPwdScore(uniqPass,len));
    sequentialInputScores=getSequentialInput(pwd);
    finalScore=scr-sequentialInputScores;
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
  document.getElementById('complexity').innerHTML = comp;
  return false;
}

function getPwdScore(strPassword,len) {
  // Reset combination count
  var nScore = 0,nLowerCount=0,nUpperCount=0,nNumberCount=0,nCharacterCount=0;
   // Password length
  // -- 8 or more
 if(len > 7){
  nScore += 10;
}
else{
  nScore+=5;
}
  // Letters
  if(uppercaseletterFlag){
  nUpperCount = countContain(strPassword, upperCaseAlphabets);
  }
  if(lowercaseletterFlag){
  nLowerCount = countContain(strPassword, lowerCaseAlphabets);
  }
  // -- Letters are all lower case
  if (nUpperCount == 0 && nLowerCount != 0) {
    nScore += 10;
  }
  else if(nLowerCount == 0 && nUpperCount != 0){
    nScore += 10;
  }
  else if(nLowerCount != 0 && nUpperCount !=0){
    nScore += 20;
  }

  // Numbers
  if(numberFlag){
  nNumberCount = countContain(strPassword, numbers);
  }
  // -- 1 number
  if (nNumberCount != 0) {
    nScore += 10;
  }

  // Characters
  if(spclcharacterFlag){
  nCharacterCount = countContain(strPassword, specialCharacters);
  }
  // -- 1 character
  if (nCharacterCount != 0) {
    nScore += 10;
  }
 // -- Mixed case letters, numbers, and characters
 if (nNumberCount != 0 && nUpperCount != 0 && nLowerCount != 0
  && nCharacterCount != 0) {
nScore += 40;
}
// -- Letters, numbers, and characters
else if (nNumberCount != 0 && nUpperCount != 0 && nCharacterCount != 0 || nNumberCount != 0 && nLowerCount != 0 && nCharacterCount != 0 || 
  nNumberCount != 0 && nLowerCount != 0 && nUpperCount != 0 ||  nNumberCount != 0 && nCharacterCount != 0 && nUpperCount != 0 ) {
  nScore += 30; 
}
  // nLowerCount != 0 && nUpperCount !=0 here this condition is excluded as we checked this condition previously 168
 else if (nNumberCount != 0 && nLowerCount != 0|| nNumberCount != 0 && nUpperCount != 0 || nNumberCount != 0 && nCharacterCount != 0 ||
    nCharacterCount !=0 && nLowerCount != 0 ||  nCharacterCount !=0 && nUpperCount != 0) {
    nScore += 20;
  }
  return nScore;
}

// Checks a string for a list of characters
function countContain(strPassword, strCheck) {
  // Declare variables
  var nCount = 0;

  for (i = 0; i < strPassword.length; i++) {
    if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
      if(strPassword[i])
      nCount++;
    }
  }
  return nCount;
}


function getUniqueValuesOfPassword(password){
  var uniqueArray = [];
  // Loop through array values
  for(i=0; i < password.length; i++){
      if(uniqueArray.indexOf(password[i]) === -1) {
          uniqueArray.push(password[i]);
      }
  }
  var uniqString=uniqueArray.toString();
  return uniqString;
}

function getSequentialInput(pwd){
	const onlyUpperCaseAlphabets = pwd.replace(/[^A-Z]/g, '');
	const onlyLowerCaseAlphabets = pwd.replace(/[^a-z]/g, '');
	const onlyNumbers = pwd.replace(/[^0-9]/g, '');
	const onlyspecial=pwd.replace(/[^!,%,&,@,#,$,^,*,?,_,~,>,<]/g,'');
	var forwardString,reverseString, i;
  sequentialInputScore=0;
	for (i=0; i < 23; i++) {
			forwardString = upperCaseAlphabets.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyUpperCaseAlphabets.indexOf(forwardString) != -1 || onlyUpperCaseAlphabets.indexOf(reverseString) != -1) {
				sequentialInputScore += 10;
				}
		}
		for (i=0; i < 23; i++) {
			forwardString = lowerCaseAlphabets.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyLowerCaseAlphabets.indexOf(forwardString) != -1 || onlyLowerCaseAlphabets.indexOf(forwardString) != -1) {
				sequentialInputScore += 10;
				}
		}
		/* Check for sequential numeric string patterns (forward and reverse) */
		for (i=0; i < 8; i++) {
			forwardString = numbersWithZero.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyNumbers.indexOf(forwardString) != -1 || onlyNumbers.indexOf(reverseString) != -1) {
				sequentialInputScore += 10;
				}
      }
		/* Check for sequential symbol string patterns (forward and reverse) */
		for (i=0; i < 13; i++) {
			forwardString = specialCharacters.substring(i,parseInt(i+3));
			reverseString = forwardString.split('').reverse().join('');
			if (onlyspecial.indexOf(forwardString) != -1 || onlyspecial.indexOf(reverseString) != -1) { 
				sequentialInputScore += 10;
			}
    }
    return sequentialInputScore;
	}
