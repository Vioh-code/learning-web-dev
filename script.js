// Variables defining external values
let wordArray = [];
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const generateButton = document.getElementById('generateButton');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const passwordLength = document.getElementById('passwordLength');
const numPin = document.getElementById('numPin');
const letPin = document.getElementById('letPin');
const symPin = document.getElementById('symPin');
const numRan = document.getElementById('numRan');
const letRan = document.getElementById('letRan');
const symRan = document.getElementById('symRan');
const dropDown = document.getElementById('dropDown');
const pinCheck = document.querySelector('.pin-code');
const ranCheck = document.querySelector('.rand-char');
const passCheck = document.querySelector('.pass-phra');
const combCheck = document.querySelector('.comb-lock');
const allOptions = document.querySelectorAll('.pin-code, .rand-char, .pass-phra, .comb-lock');
const fourDigit = document.getElementById('fourDigit');
const sixDigit = document.getElementById('sixDigit');
const randomButton = document.getElementById('randomButton');
const randomOutput = document.getElementById('randomOutput');
// Variales defined for the functions
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'; 

//This loads the text file with the words//
async function loadWords() {
    const response = await fetch('wordlist.txt');
    const text = await response.text();
    wordArray = text.split('\n').filter(word => word.trim() !== '');
}

//Function Start Pin Code Function Start//
function genPassword() {
    const selected = dropDown.value;
    if (selected === 'Pin Code') {
        genpinCode();
    }
    if (selected === 'Random Characters') {
        genranCode();
    }
    if (selected === 'Passphrase') {
        genpassCode();
    }
}

function pinLength (){
    let length; 
    if (fourDigit.checked) {
        return 4;
    }
    else if (sixDigit.checked) {
        return 6
    }
}

function genpinCode () {
    let pinCode = '';
    if (numPin.checked) {
        pinCode += numberChars;
    }
    if (letPin.checked) {
        pinCode += uppercaseChars;
    }
    if (symPin.checked) {
        pinCode += symbolChars;
    }

    if (pinCode === '') {
        alert('Please select one of the boxes please!')
        return;
    }
    const length = pinLength();

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pinCode.length);
        password += pinCode[randomIndex]
    }

    passwordOutput.value = password;
}
// End Pin Code End//

//Function Start Random Characters Function Start//
function genranCode () {
    let rancode = '';
    if (numRan.checked) {
        rancode += numberChars;
    }
    if (letRan.checked) {
        rancode += uppercaseChars;
    }
    if (symRan.checked) {
        rancode += symbolChars;
    }

    if (rancode === '') {
        alert('Please select one of the boxes please!')
        return;
    }
    const length = passwordLength.value;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * rancode.length);
        password += rancode[randomIndex]
    }

    randomOutput.value = password;
}

//Drop down watcher. This function updates the class to hide all of the options. Then depending on the option selected it wil update those settings to show.
dropDown.addEventListener('change', function() {
    allOptions.forEach(option => option.style.display = 'none');
    const selected = dropDown.value; 
    if (selected === 'Pin Code') {
        pinCheck.style.display = 'block';}
    else if (selected === 'Random Characters'){
        ranCheck.style.display = 'block';}
    else if (selected === 'Passphrase'){
        passCheck.style.display = 'block';}
    else if (selected === 'Combination Lock'){
        combCheck.style.display = 'block';}
    else if (selected === 'Select One'){
        allOptions.forEach(option => option.style.display = 'none')}
});

// Listen for button clicks
generateButton.addEventListener('click', genPassword);

copyButton.addEventListener('click', function() {
    // Select the password text
    passwordOutput.select();
    
    // Copy to clipboard
    navigator.clipboard.writeText(passwordOutput.value);
    
    // Change button text temporarily to show it worked
    copyButton.textContent = 'Copied!';
    setTimeout(function() {
        copyButton.textContent = 'Copy';
    }, 2000);
});

randomButton.addEventListener('click', function() {
    // Select the password text
    randomOutput.select();
    
    // Copy to clipboard
    navigator.clipboard.writeText(randomOutput.value);
    
    // Change button text temporarily to show it worked
    randomButton.textContent = 'Copied!';
    setTimeout(function() {
        randomButton.textContent = 'Copy';
    }, 2000);
});