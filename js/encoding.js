//Decryption Logic
const btnEncrypt = document.getElementById("btnEncrypt");
const inputText = document.getElementById("input");
const outputText = document.getElementById("output");

btnEncrypt.addEventListener("click", (e) => {
  const payload = inputText.value;
  const encrypted = CryptoJS.AES.encrypt(payload, "Secret Passphrase");
  outputText.value = encrypted;

});

//Decryption Logic

const btnDecrypt = document.getElementById("btnDecrypt");
const inputText2 = document.getElementById("input2");
const outputText2 = document.getElementById("output2");

btnDecrypt.addEventListener("click", (e) => {
  const payload = inputText2.value;
  const decrypted = CryptoJS.AES.decrypt(payload, "Secret Passphrase");
  outputText2.value = decrypted.toString(CryptoJS.enc.Utf8);

});
