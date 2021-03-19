const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');

//declaring array for lower value and higher value  from value is going to taken arrayname(lowest_range, highest_range);
//https://www.petefreitag.com/cheatsheets/ascii-codes/ use to add perticular code for character, number, symbol 
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);

//using lower case as a default in password

const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

// It link character AmountNumber and characterAmountRange to have same value as slider move
// e is event argument
function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}

//The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
//stop form from submitting and refresh the page
form.addEventListener('submit', e => {
    e.preventDefault()

    //getting value from form when slider move and checked box is checked to generate password
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);

    //it will display password

    passwordDisplay.innerText = password
});

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CHAR_CODES
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)

    //passwordCharacters = [] it will store password 

    const passwordCharacters = []
    for (let i = 0; i < characterAmount; i++) {
        //it gives random  number between 0 and charCodes.length by doing math.floor and math.random
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}