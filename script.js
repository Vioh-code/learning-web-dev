//this grabs all of the elements from the HTML
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const generateButton = document.getElementById('generateButton');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const passwordLength = document.getElementById('passwordLength');
const arialFont = document.getElementById('arialRadio')
const impactFont = document.getElementById('impactRadio');
const verdanaFont = document.getElementById('verdanaRadio');

// This will define the character sets for the password generation
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'; 

//This function will generate the password depending on selections made
function generatePassword() {
    let availableChars = '';
    if (includeUppercase.checked) {
        availableChars += uppercaseChars;
    }
    if (includeLowercase.checked) {
        availableChars += lowercaseChars;
    }
    if (includeNumbers.checked) {
        availableChars += numberChars;
    }
    if (includeSymbols.checked) {
        availableChars += symbolChars;
    }

    //if no options are selected
    if (availableChars === '') {
        alert('Please select at leaset one character type!');
        return;
    }
    // Get the desired pasword length
    const length = parseInt(passwordLength.value);

    // This will generate the password
    let password = '';
    for (let i = onabort; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex]
    }

    passwordOutput.value = password;
}

//This function is for the radio button check and css change
//function fontSelect() {
arialFont.addEventListener('click', function() {
    if (arialFont.checked) {
    passwordOutput.classList.remove('font-serif', 'font-impact', 'font-verdana');
    passwordOutput.classList.add('font-arial');
    }
});
impactFont.addEventListener('click', function() {
    if (impactFont.checked) {
    passwordOutput.classList.remove('font-serif', 'font-verdana', 'font-arial');
    passwordOutput.classList.add('font-impact');
    }
});
verdanaFont.addEventListener('click', function() {
    if (verdanaFont.checked) {
    passwordOutput.classList.remove('font-serif', 'font-arial', 'font-impact');
    passwordOutput.classList.add('font-verdana');
    }
});
//};
// Listen for button clicks
generateButton.addEventListener('click', generatePassword);

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