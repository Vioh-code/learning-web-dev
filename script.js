const wordSlider = document.getElementById('wordSlider');
const wordCount = document.getElementById('wordCount');
const copyButton = document.getElementById('copyButton');
const type = document.getElementById('type');
const numbCont = document.getElementById( 'numbCont');
const lettCont = document.getElementById('lettCont');
const symbCont = document.getElementById('symbCont');
const charCont = document.getElementById('charCont');
const phraCont = document.getElementById('phraCont');
const fieldCont = document.getElementById('fieldCont')
const copyCont = document.getElementById('copyCont');
const genCont = document.getElementById('genCont');
const submit = document.getElementById('submit');
const numbers = document.getElementById('numbers');
const letters = document.getElementById('letters');
const symbols = document.getElementById('symbols');

const lettChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numbChars = '0123456789';
const symbChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const wordBank = ['Apple', 'beach', 'Chair', 'dance', 'Eagle',
    'flame', 'Grape', 'House', 'island', 'Jungle',
    'Knife', 'lemon', 'mountain', 'Night', 'ocean',
    'piano', 'quick', 'River', 'storm', 'Tiger'];

//Settings Grouped together based on selection from dropdown
const elementVis = {
    '': [],
    'password':  [genCont, copyCont, fieldCont, numbCont, lettCont, symbCont, charCont],
    'passphrase':  [genCont, copyCont, fieldCont, numbCont, symbCont, phraCont]
};
//All settings are listed here so that we can show or hide them based on
//selection of drop down.
const allOptions =  [genCont, copyCont, fieldCont, numbCont, lettCont, symbCont, charCont, phraCont];

//getOptions is used to check all of the options that have been selected after
//the drop down has been selected. 
function getOptions() {
    const selectedType = type.value;
    const numbCheck = numbers.checked;
    const lettCheck = letters.checked;
    const symbCheck = symbols.checked;
    if (selectedType == '') {
        return {error: 'Please select a password type' };
    };
    // Checks the settings if Password is selected and returns those options
    if (selectedType == 'password') {
        if (!numbCheck && !lettCheck && !symbCheck) {
            return { error: 'Please select at least one character type' };
        }
        return {
            type: selectedType,
            numbers: numbCheck,
            letters: lettCheck,
            symbols: symbCheck,
            length: charLength.value
        };
        // Checks the settings if Passphrase is selected and returns those options 
    } else if (selectedType == 'passphrase') {
        if (!numbCheck && !symbCheck) {
            return { error: 'Please select at least one character type as a separator' };
        }
        return {
            type: selectedType,
            numbers: numbCheck,
            symbols: symbCheck,
            length: wordSlider.value
        };
    };
};

function generatePass() {
    const options = getOptions();
    let password = '';
    // loop till the password is filled
    while (password.length < options.length) {
        // each loop pick a random number between 0 and 1
        let random = Math.random();

        // if the number is less than 0.3 then try to generate a number
        if (random < 0.3) {
            // if we didn't pick numbers, loop and try again
            if (!options.numbers) {
                continue;
            }
            const randomIndex = Math.floor(Math.random() * numbChars.length);
            password += numbChars[randomIndex];
        } else if (random < 0.6) {
            if (!options.letters) {
                continue;
            }
            const randomIndex = Math.floor(Math.random() * lettChars.length);
            password += lettChars[randomIndex];
        } else {
            if (!options.symbols) {
                continue;
            }
            const randomIndex = Math.floor(Math.random() * symbChars.length);
            password += symbChars[randomIndex];
        }
    }
    
    return password;
};

function genPhrase() {
    let length = wordSlider.value;
    let selectedWords = [];
    
    // Get separator characters based on selected options
    let separators = [];
    if (numbers.checked) separators.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    if (symbols.checked) separators.push('!', '@', '#', '$', '%', '&', '*', '-', '_');
    
    // Select unique words
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        const word = wordBank[randomIndex];
        
        if (selectedWords.includes(word)) {
            i--;
        } else {
            selectedWords.push(word);
        }
    }
    
    // Join words with random separators
    let passphrase = '';
    for (let i = 0; i < selectedWords.length; i++) {
        passphrase += selectedWords[i];
        // Add separator between words (but not after the last word)
        if (i < selectedWords.length - 1) {
            const randomSep = separators[Math.floor(Math.random() * separators.length)];
            passphrase += randomSep;
        }
    }
    
    return passphrase;
}

// Generate button test for options output.
submit.addEventListener('click', function() {
    const options = getOptions();
    //checks for errors first and returns if found. Ending the function there.
    if (options.error) {
        alert(options.error);
        //if no errors are found, then it will output the options selected.
    } else {
        // get the password text box
        const input = document.querySelector('.passwordOutput');
        
        // Check type and run appropriate generator
        if (options.type === 'password') {
            input.value = generatePass();
        } else if (options.type === 'passphrase') {
            input.value = genPhrase();
        }
    }
});

// Clear output and reset options when switching between password/passphrase
type.addEventListener('change', function() {
    // Clear the password output
    const input = document.querySelector('.passwordOutput');
    input.value = 'Keep it Secret. Keep it safe';
    
    // Uncheck all checkboxes
    numbers.checked = false;
    letters.checked = false;
    symbols.checked = false;
});

//Function to watch drop down and update the elements classes with "hidden"
//based on selection made to only show the applicable options.
type.addEventListener('change', function () {
    allOptions.forEach(vis => vis.classList.add('hidden'));

    const toShow = elementVis[type.value];
    toShow.forEach(vis => vis.classList.remove('hidden'));
});

copyButton.addEventListener('click', function() {
    const input = document.querySelector('.passwordOutput');
    
    navigator.clipboard.writeText(input.value).then(function() {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy:', err);
    });
});

//Update the displayed number based on the slider value to make it interactive. 
wordSlider.addEventListener('input', function() {
    wordCount.textContent = wordSlider.value;
});