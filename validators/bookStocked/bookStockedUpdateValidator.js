//? It defines the rules for input data (edit an existing book in the catalogue) - all fields optional, only validates what's provided.

const z = require('zod');
const bookStockedValidator = require('./bookStockedValidator');

//*.partial() — a Zod method that automatically makes all fields optional, while keeping the validation rules (max, positive, etc.) for each field intact in case it is actually submitted.
const bookStockedUpdateValidator = bookStockedValidator.partial();

module.exports = bookStockedUpdateValidator;
