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
//All settings are listed here so that we can show or hide them based on selection of drop down.
const allOptions =  [genCont, copyCont, fieldCont, numbCont, lettCont, symbCont, charCont, phraCont];

//Function to watch drop down and update the elements classes with "hidden" based on selection made to only show the applicable options.
type.addEventListener('change', function () {
    allOptions.forEach(vis => vis.classList.add('hidden'));

    const toShow = elementVis[type.value];
    toShow.forEach(vis => vis.classList.remove('hidden'));
});

//Update the displayed number based on the slider value to make it interactive. 
wordSlider.addEventListener('input', function() {
    wordCount.textContent = wordSlider.value;
});

//getOptions is used to check all of the options that have been selected after the drop down has been selected. 
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
    }else if (selectedType == 'passphrase') {
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
    console.log(options);
    //checks for errors first and returns if found. Ending the function there.
    if (options.error) {
        alert(options.error);
        //if no errors are found, then it will output the options selected.
    } else {
        console.log('Valid options:', options);
    }
});


//Here is the function that will actually generate the password. We are still missing alot here. Most of this was pulled from my other version.
function generatePass() {
    let password = '';
    const options = getOptions();
    if (options.error) {
        alert(options.error);
    } else {
        if (options.type == 'password');
            for (let i = 0; i < length; i++) {
                const ranArray = Math.floor(Math.random() * options.length);
                const ranChar = Math.floor(Math.random() * options[ranArray].length);
                password += options[ranArray][ranChar];        
            }
        };
};