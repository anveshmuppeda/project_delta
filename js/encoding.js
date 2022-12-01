//encryption logic


const btnEncrypt = document.getElementById("btnEncrypt");

const inputText = document.getElementById("input");

const outputText = document.getElementById("output");


btnEncrypt.addEventListener("click", (e) => {

  // console.log("btn encrypt");

  const payload = inputText.value;

  const encrypted = CryptoJS.AES.encrypt(payload, "Secret Passphrase");

  console.log(encrypted);

  outputText.value = encrypted;

});


//decryption logic


const btnDecrypt = document.getElementById("btnDecrypt");

const inputText2 = document.getElementById("input2");


const outputText2 = document.getElementById("output2");

btnDecrypt.addEventListener("click", (e) => {

  console.log("btn decrypt");

  const payload = inputText2.value;

  const decrypted = CryptoJS.AES.decrypt(payload, "Secret Passphrase");

  console.log(decrypted);

  outputText2.value = decrypted.toString(CryptoJS.enc.Utf8);

});
