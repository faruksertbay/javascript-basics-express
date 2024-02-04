/* eslint-disable prefer-destructuring, radix */
const express = require('express');

const app = express();

app.use(express.json());

// arrays

app.post('/arrays/element-at-index/:index', (req, res) => {
  const index = req.params.index;
  const array = req.body.array;
  if (array && array.length > index) {
    res.status(200).json({ result: array[index] });
  } else {
    res.status(400).json({ error: 'Invalid index' });
  }
});

app.post('/arrays/to-string', (req, res) => {
  const array = req.body.array;
  if (array) {
    res.status(200).json({ result: array.toString() });
  } else {
    res.status(400).json({ error: 'Invalid array' });
  }
});

app.post('/arrays/append', (req, res) => {
  const array = req.body.array;
  const value = req.body.value;
  if (array && value) {
    array.push(value);
    res.status(200).json({ result: array });
  } else {
    res.status(400).json({ error: 'Invalid array or value' });
  }
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;
  const result = array.filter(word => /^[aeiou]/i.test(word));
  res.status(200).json({ result });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  const index = req.query.index !== undefined ? parseInt(req.query.index) : 0;
  if (index < 0 || index >= array.length) {
    res.status(400).json({ error: 'Invalid index.' });
  } else {
    array.splice(index, 1);
    res.status(200).json({ result: array });
  }
});

// booleans

app.post('/booleans/negate', (req, res) => {
  const value = req.body.value;
  if (typeof value === 'boolean') {
    res.status(200).json({ result: !value });
  } else {
    res.status(400).json({ error: 'Invalid boolean' });
  }
});

app.post('/booleans/truthiness', (req, res) => {
  const value = req.body.value;
  const truthiness = Boolean(value);
  res.status(200).json({ result: truthiness });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const number = parseInt(req.params.number);
  if (Number.isNaN(number)) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    const isOdd = number % 2 !== 0;
    res.status(200).json({ result: isOdd });
  }
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const string = req.params.string;
  const character = req.params.character;
  if (character.length !== 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    const startsWith = string.startsWith(character);
    res.status(200).json({ result: startsWith });
  }
});

// numbers

app.get('/numbers/add/:number1/and/:number2', (req, res) => {
  const { number1, number2 } = req.params;
  if (Number.isNaN(parseFloat(number1)) || Number.isNaN(parseFloat(number2))) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    const result = parseFloat(number1) + parseFloat(number2);
    res.status(200).json({ result });
  }
});

app.get('/numbers/subtract/:number1/from/:number2', (req, res) => {
  const { number1, number2 } = req.params;
  if (!/^[-+]?[0-9]+(\.[0-9]+)?$/.test(number1) || !/^[-+]?[0-9]+(\.[0-9]+)?$/.test(number2)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    const result = parseFloat(number2) - parseFloat(number1);
    res.status(200).json({ result });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const number1 = parseFloat(req.body.a);
  const number2 = parseFloat(req.body.b);
  if (req.body.a === undefined || req.body.b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(number1) || Number.isNaN(number2)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    const result = number1 * number2;
    res.status(200).json({ result });
  }
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(parseFloat(a)) || Number.isNaN(parseFloat(b))) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else if (parseFloat(b) === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    const result = parseFloat(a) / parseFloat(b);
    res.status(200).json({ result });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;
  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    const result = a % b;
    res.status(200).json({ result });
  }
});

// strings
app.get('/strings/lower/:string', (req, res) => {
  const { string } = req.params;
  res.status(200).json({ result: string.toLowerCase() });
});

app.get('/strings/hello/:string', (req, res) => {
  const { string } = req.params;
  res.status(200).json({ result: `Hello, ${string}!` });
});

app.get('/strings/upper/:string', (req, res) => {
  const { string } = req.params;
  res.status(200).json({ result: string.toUpperCase() });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const length = req.query.length ? parseInt(req.query.length) : 1;
  res.status(200).json({ result: string.substring(0, length) });
});

module.exports = app;
