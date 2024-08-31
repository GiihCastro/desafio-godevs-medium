document.addEventListener('DOMContentLoaded', function () {

    function romanToDecimal(roman) {
        const romanNumeralMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let total = 0;
        for (let i = 0; i < roman.length; i++) {
            const currentVal = romanNumeralMap[roman[i]];
            const nextVal = romanNumeralMap[roman[i + 1]];
            if (nextVal && currentVal < nextVal) {
                total -= currentVal;
            } else {
                total += currentVal;
            }
        }
        return total;
    }

    const convertButton = document.getElementById('convertButton');
    convertButton.addEventListener('click', function () {
        const romanInput = document.getElementById('romanInput').value.toUpperCase();
        const result = romanToDecimal(romanInput);
        document.getElementById('result').textContent = `Resultado: ${result}`;
    });

    function decryptCaesarCipher(text, shift) {
        let result = '';
        shift = shift % 26;

        for (let i = 0; i < text.length; i++) {
            let char = text[i];

            if (char.match(/[a-z]/i)) {
                const code = text.charCodeAt(i);

                if (code >= 65 && code <= 90) {
                    char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
                }
            }

            result += char;
        }
        return result;
    }

    const decryptButton = document.getElementById('decryptButton');
    decryptButton.addEventListener('click', function () {
        const textInput = document.getElementById('textInput').value;
        const shiftInput = parseInt(document.getElementById('shiftInput').value);
        const result = decryptCaesarCipher(textInput, shiftInput);
        document.getElementById('caesarResult').textContent = `Resultado: ${result}`;
    });

    function insertWordAtIndices(phrase, word, indices) {
        if (indices.length === 0) return phrase;

        indices = indices.filter(index => index >= 0 && index <= phrase.length);
        indices.sort((a, b) => a - b);

        let result = '';
        let lastIndex = 0;

        indices.forEach(index => {
            result += phrase.slice(lastIndex, index) + word;
            lastIndex = index;
        });

        result += phrase.slice(lastIndex);
        return result;
    }

    const insertButton = document.getElementById('insertButton');
    insertButton.addEventListener('click', function () {
        const phrase = document.getElementById('phraseInput').value;
        const word = document.getElementById('wordInput').value;
        const indices = document.getElementById('indexArrayInput').value
            .split(',')
            .map(Number)
            .filter(num => !isNaN(num));

        const result = insertWordAtIndices(phrase, word, indices);
        document.getElementById('insertResult').textContent = `Resultado: ${result}`;
    });

    class Equation {
        constructor(a = 0, b = 0, c = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
        }

        calculateRoots() {
            if (this.a === 0 && this.b === 0 && this.c === 0) {
                return 'Erro: a, b e c não podem ser todos zero.';
            }

            if (this.a === 0) {
                return this.b !== 0 ? `Equação linear. Raiz única: ${-this.c / this.b}` : 'Erro: Equação degenerada, não há raízes definidas.';
            }

            const delta = Math.pow(this.b, 2) - (4 * this.a * this.c);
            let steps = `Passos para a resolução:\n\n1. Calcular o delta: Δ = b² - 4ac\n   Δ = (${this.b})² - 4*(${this.a})*(${this.c}) = ${delta}\n\n`;

            if (delta < 0) {
                return steps + 'Não há raízes reais, pois Δ < 0.';
            } else if (delta === 0) {
                const root = -this.b / (2 * this.a);
                steps += `2. Δ = 0: há uma raiz real dupla.\n   x = -b / (2a)\n   x = -(${this.b}) / (2*${this.a}) = ${root}`;
                return steps;
            } else {
                const root1 = (-this.b + Math.sqrt(delta)) / (2 * this.a);
                const root2 = (-this.b - Math.sqrt(delta)) / (2 * this.a);
                steps += `2. Δ > 0: há duas raízes reais.\n   x1 = (-b + √Δ) / (2a)\n   x1 = (-${this.b} + √${delta}) / (2*${this.a}) = ${root1}\n   x2 = (-b - √Δ) / (2a)\n   x2 = (-${this.b} - √${delta}) / (2*${this.a}) = ${root2}`;
                return steps;
            }
        }
    }

    const solveButton = document.getElementById('solveButton');
    solveButton.addEventListener('click', function () {
        const a = parseFloat(document.getElementById('aInput').value);
        const b = parseFloat(document.getElementById('bInput').value);
        const c = parseFloat(document.getElementById('cInput').value);

        const equation = new Equation(a, b, c);
        const result = equation.calculateRoots();
        document.getElementById('equationResult').textContent = `Resultado: \n${result}`;
    });

    function calculatePersistence(number) {
        if (number < 10) return 0;

        let count = 0;
        let num = number;

        while (num >= 10) {
            num = num.toString().split('').reduce((acc, digit) => acc * parseInt(digit), 1);
            count++;
        }

        return count;
    }

    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', function () {
        const number = parseInt(document.getElementById('numberInput').value, 10);
        if (isNaN(number) || number < 0) {
            document.getElementById('persistenceResult').textContent = 'Por favor, insira um número válido.';
            return;
        }
        const result = calculatePersistence(number);
        document.getElementById('persistenceResult').textContent = `Persistência Multiplicativa: ${result}`;
    });

    function generatePasswords(options) {
        const results = [];

        function permute(arr, m = []) {
            if (arr.length === 0) {
                results.push(m);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    const curr = arr.slice();
                    const next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next));
                }
            }
        }

        permute(options);
        return results;
    }

    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', function () {
        const options = document.getElementById('optionsInput').value.split(',').map(option => option.trim());
        if (options.length === 0 || options.some(option => option === '')) {
            document.getElementById('passwordResult').textContent = 'Por favor, insira opções válidas.';
            return;
        }
        const result = generatePasswords(options);
        document.getElementById('passwordResult').textContent = `Senhas Geradas:\n${result.map(arr => arr.join('')).join('\n')}`;
    });
});
