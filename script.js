const wordSlider = document.getElementById('wordSlider');
const wordCount = document.getElementById('wordCount');
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

//Settings Grouped together based on selection from dropdown
const elementVis = {
    '': [],
    'password':  [genCont, copyCont, fieldCont, numbCont, lettCont, symbCont, charCont],
    'passphrase':  [genCont, copyCont, fieldCont, numbCont, symbCont, phraCont]
};
//All settings are listed here so that we can show or hide them based on
//selection of drop down.
const allOptions =  [genCont, copyCont, fieldCont, numbCont, lettCont, symbCont, charCont, phraCont];

//Function to watch drop down and update the elements classes with "hidden"
//based on selection made to only show the applicable options.
type.addEventListener('change', function () {
    allOptions.forEach(vis => vis.classList.add('hidden'));

    const toShow = elementVis[type.value];
    toShow.forEach(vis => vis.classList.remove('hidden'));
});

//Update the displayed number based on the slider value to make it interactive. 
wordSlider.addEventListener('input', function() {
    wordCount.textContent = wordSlider.value;
});

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

// Generate button test for options output.
submit.addEventListener('click', function() {
    const options = getOptions();
    //checks for errors first and returns if found. Ending the function there.
    if (options.error) {
        alert(options.error);
        //if no errors are found, then it will output the options selected.
    } else {
        console.log('Valid options:', options);
        // get the password text box
        const input = document.querySelector('.passwordOutput');
        // update it's value with a new generated password
        input.value = generatePass();
    }
});


function generatePass() {
    const options = getOptions();
    let password = '';
    // for loop to generate password. 
    for (let i = 0; i <  options.length; i++) {
        // start with no chosen type
        let chosenType = null;

        // loop till the chosen type is picked
        while (!chosenType) {
            // each loop pick a random number between 0 and 1
            let random = Math.random();

            // if the number is less than 0.3 then try to generate a number
            if (random < 0.3) {
                // if we didn't pick numbers, loop and try again
                if (!options.numbers) {
                    continue;
                }
                chosenType = 'numbers';
            } else if (random < 0.6) {
                if (!options.letters) {
                    continue;
                }
                chosenType = 'letters';
            } else {
                if (!options.symbols) {
                    continue;
                }
                chosenType = 'symbols';
            }
        }

        if (chosenType === 'numbers') {
            const randomIndex = Math.floor(Math.random() * numbChars.length);
            password += numbChars[randomIndex];
        } else if (chosenType === 'letters') {
            const randomIndex = Math.floor(Math.random() * lettChars.length);
            password += lettChars[randomIndex];
        } else if (chosenType === 'symbols') {
            const randomIndex = Math.floor(Math.random() * symbChars.length);
            password += symbChars[randomIndex];
        }
    }
    
    console.log('Final password:', password);
    return password;
};
