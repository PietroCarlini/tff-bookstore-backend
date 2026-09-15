const z = require('zod');
const orderValidator = require('./orderValidator');

const orderUpdateValidator = z.object({
    state: z.enum(['Sent', 'In Progress', 'Ready', 'Collected', 'Canceled'],
        { error: 'Invalid order state' }
    ),
    price: z.number(
        { error: (issue) => issue.input === undefined ? 'A price is required' : 'Price needs to be a number' }
    ).positive('Price must be greater than 0')
}).partial();

module.exports = orderUpdateValidator;