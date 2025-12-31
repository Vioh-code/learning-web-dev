// Variables defining external values
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const generateButton = document.getElementById('generateButton');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const passwordLength = document.getElementById('passwordLength');
const numRan = document.getElementById('numRan');
const letRan = document.getElementById('letRan');
const symRan = document.getElementById('symRan');
const dropDown = document.getElementById('dropDown');
const ranCheck = document.querySelector('.rand-char');
const passCheck = document.querySelector('.pass-phra');
const allOptions = document.querySelectorAll('.rand-char, .pass-phra');
const numbWords = document.getElementById('numbWords')
const wordBank = ['Fight', 'Gloving', 'World', 'Street', 'Light', 'Game', 'Running', 'Leader'];
const passphraseOutput = document.getElementById('passphraseOutput');
const passButton = document.getElementById('passButton');
const passNum = document.getElementById('passNum');
// Variales defined for the functions
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'; 


// This function is designed to handle 1 step and produce 2 actions. This function is checking to see if the box has been checked, and if it has it is
// then assigning the string of characters to a variable and then pushing that variable to an array for later reference. We start with a blank array
// and then it steps through each check. We have a condition set using the .length varable that arrays have to check and see if there is any length
// to the array. If there is not, then we know that no boxes have been checked and we can end the function there with an alert popup.
function boxCheck() {
    const allArrays = [];    
    if (letRan.checked) {
        ranLett = lowercaseChars;
        allArrays.push(ranLett);
    } 
    if (numRan.checked) {
        ranNumb = numberChars;
        allArrays.push(ranNumb);
    }
    if (symRan.checked) {
        ranSymb = symbolChars;
        allArrays.push(ranSymb);
    }
    if (allArrays.length === 0) {
        alert('Please select one of the boxes!')
        return;
    }
    return allArrays;
}

// This funciton is for the Generate Password button. It will first check what option is selected and then run the neccesary script to generate the password.
function checkDrop() {
    if (dropDown.value == "Random Characters")
        generatePass();
    if (dropDown.value == "Passphrase")
        genPhrase();
}

// This function handles the password generation. After the boxCheck function runs and updates the allArrays variable, this function will then 
// grab the password length that was entered. Then run a for loop to do the math to generate the password. The way this part works is in the boxCheck
// function it is checking each box to see if it has been selected. If it has been selected it will update the variable with the correct array containing
// a string of characters and then pass that variable to allArrays. Then we use attributes of the array to find out which entry in the array are we going to 
// use. In this example we are using nested arrays. An array with multiple arrays in them. 
function generatePass() {
    let length = passwordLength.value;
    let password = '';
    let allArrays = boxCheck();
    for (let i = 0; i < length; i++) {
        const ranArray = Math.floor(Math.random() * allArrays.length);
        const ranChar = Math.floor(Math.random() * allArrays[ranArray].length);
        password += allArrays[ranArray][ranChar];        
    }
    passwordOutput.value = password; 
}
// This is the passphrase gen script. This one was a little more complex than the generate password. In the genPharase function we start out by defining two
// variables to set up the array, and to pull in the amount of words they want to use. Then we use a for loop to do the math and get the words. The const
// passPhrase is using Math.floor and Math.random function along with the length of the word bank to produce the number of the array we are going to pull from
// wordBank is an array, and the wordBank.length measures how many items are in the array. 10 words would mean wordBank.length = 10. Then from there we set
// a new const up and call it word. This is going to be the variable that holds the words that were chosen. We wanted to make sure that we dont use the same
// word twice. So we set up an if statement to check if the word has already been added to selectedWords. If it has then it subtracts 1 to repeat the loop 
// until we get a new word. Once its a new word we then use the .push function to get the word in to the array selectedWords. Then finally after the loop is
// done, we then need to see if they need to include a number. It checks to see if the box is checked. If so, it will then get a random number from 1 - 10
// and add it to the end of the phrase. We then resolve the variable result to have our result. That is added to the output box and allows it to be copied. 
function genPhrase() {
    let length = numbWords.value;
    let selectedWords = [];
    for (let i = 0; i < length; i++) {
        const passPhrase = Math.floor(Math.random() * wordBank.length);
        const word = wordBank[passPhrase];
        if (selectedWords.includes(word)) {
            i--;
        }
        else {
            selectedWords.push(word);
        }
    }
    let result = selectedWords.join('-');
    if (passNum.checked) {
        result += Math.floor(Math.random() * 10);
    }
    passphraseOutput.value = result;
}

// Drop down watcher. This function updates the class to hide all of the options. Then depending on the option selected it wil update those settings to show.
dropDown.addEventListener('change', function() {
    allOptions.forEach(option => option.style.display = 'none');
    const selected = dropDown.value; 
    if (selected == 'Random Characters'){
        ranCheck.style.display = 'block';}
    else if (selected == 'Passphrase'){
        passCheck.style.display = 'block';}
    else if (selected == 'Select One'){
        allOptions.forEach(option => option.style.display = 'none')}
});

// Generate Password Event Listener. Watches for click and then runs generatePass function.
generateButton.addEventListener('click', checkDrop);

// Copy Button event Listener and Animation. This function works by fist watching for the click. Once the click happens, it then grabs the output of the
// password field, then writes that to the clipboard. Then the copybutton text updates from copy to copied and changes color. This has a time out set to
// change it back.
copyButton.addEventListener('click', function() {
    passwordOutput.select();
    navigator.clipboard.writeText(passwordOutput.value);
    copyButton.textContent = 'Copied!';
    setTimeout(function() {
        copyButton.textContent = 'Copy';
    }, 2000);
});
// This is just a clone of the above code. It is just for the different options. This will watch for the click on the copy button. Then it will grab the 
// value in the passphrase output field. Copy that information to the clip board. And then run a little animation to signify that it has been copied. 
passButton.addEventListener('click', function() {
    passphraseOutput.select();
    navigator.clipboard.writeText(passphraseOutput.value);
    passButton.textContent = 'Copied!';
    setTimeout(function() {
        passButton.textContent = 'Copy';
    }, 2000);
});