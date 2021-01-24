const display = document.querySelector('#display')
const clear = document.querySelector('#clear')
const plusMinus = document.querySelector('#plus-minus')
const percent = document.querySelector('#percent')
const addition = document.querySelector('#add')
const subtraction = document.querySelector('#subtract')
const multiplication = document.querySelector('#multiply')
const division = document.querySelector('#divide')
const equals = document.querySelector('#equal')
const decimal = document.querySelector('#decimal')
let a, b, operator, cont

let add = (x,y) => x + y 
let subtract = (x,y) => x - y 
let multiply = (x,y) => x * y 
let divide = (x,y) => x / y 

function updateDisplay(newDigit){
    if (display.innerHTML.length <= 6) {
        if (display.innerHTML == 0) {
            clear.textContent = 'C'
            display.innerHTML = newDigit
        } else if (cont == 'next') {
            display.innerHTML = newDigit
            cont = null
        } else {
            display.innerHTML += newDigit
        }
    }
}

function clearMem () {
    display.innerHTML = 0
    decimal.disabled = false
    if (!a) {
        clear.textContent = 'AC'
    } else if (a && clear.textContent == 'C') {
        clear.textContent = 'AC'
    } else if (a && clear.textContent == 'AC') {
        a = 0
        operator = null
        cont = null
        addition.classList.remove('operator-active')
        subtraction.classList.remove('operator-active')
    }
}

function negate () {
    display.innerHTML = parseFloat(display.innerHTML) * -1
}

function percentage () {
    display.innerHTML = parseFloat(display.innerHTML) / 100
}

function additionUpdate () {
    if (!operator) {
        a = display.innerHTML
    } else {
        calculate()
    }
    addition.classList.add('operator-active')
    operator = 'a'
    nextTerm()
}

function subtractionUpdate () {
    if (!operator) {
        a = display.innerHTML
    } else {
        calculate()
    }
    subtraction.classList.add('operator-active')
    operator = 's'
    nextTerm()
}
function divisionUpdate () {
    if (!operator) {
        a = display.innerHTML
    } else {
        calculate()
    }
    division.classList.add('operator-active')
    operator = 'd'
    nextTerm()
}
function multiplicationUpdate () {
    if (!operator) {
        a = display.innerHTML
    } else {
        calculate()
    }
    multiplication.classList.add('operator-active')
    operator = 'm'
    nextTerm()
}

function nextTerm () {
    cont = 'next'
    decimal.disabled = false
}

function calculate () {
    b = display.innerHTML
    
    if (operator === 'a') {
        display.innerHTML = +add(parseFloat(a), parseFloat(b)).toFixed(1)
        addition.classList.remove('operator-active')
    } else if (operator === 's') {
        console.log('test')
        display.innerHTML = +subtract(parseFloat(a), parseFloat(b)).toFixed(1)
        subtraction.classList.remove('operator-active')
    } else if (operator === 'd') {
        console.log('test')
        display.innerHTML = +divide(parseFloat(a), parseFloat(b)).toFixed(1)
        division.classList.remove('operator-active')
    } else if (operator === 'm') {
        console.log('test')
        display.innerHTML = +multiply(parseFloat(a), parseFloat(b)).toFixed(1)
        multiplication.classList.remove('operator-active')
    }
    
    a = display.innerHTML
    b = 0
    cont = 'next'
}

clear.addEventListener('click', clearMem)
plusMinus.addEventListener('click', negate)
percent.addEventListener('click', percentage)
decimal.addEventListener ('click', () => {updateDisplay('.'); decimal.disabled = true})
addition.addEventListener('click', additionUpdate)
subtraction.addEventListener('click', subtractionUpdate)
division.addEventListener('click', divisionUpdate)
multiplication.addEventListener('click', multiplicationUpdate)
equals.addEventListener('click', calculate)

function addDigitListeners () {
    const digits = document.getElementsByClassName('digit')
    for (let i = 0; i < digits.length; i++) {
       digits[i].addEventListener ('click', function() {updateDisplay(digits[i].textContent)})
    }
}

addDigitListeners()