//? It defines the rules to edit the bookshop profile: all fields optional (PATCH), but a field that is sent can't be empty (except openingHours: free text, can be cleared)

const z = require('zod');

const bookshopUpdateValidator = z.object({
    name: z.string().max(120, 'Name cannot exceed 120 characters').trim().min(1, 'A name is required').optional(),
    city: z.string().max(200, 'City cannot exceed 200 characters').trim().min(1, 'A city is required').optional(),
    address: z.string().max(120, 'Address cannot exceed 120 characters').trim().min(1, 'An address is required').optional(),
    email: z.email({ pattern: z.regexes.email }).max(320).trim().min(1, 'An email is required').optional(),
    phone: z.string().max(120, 'Phone cannot exceed 120 characters').trim().min(1, 'A phone number is required').optional(),
    openingHours: z.string().max(2000, 'Opening hours cannot exceed 2000 characters').trim().optional(),
});

module.exports = bookshopUpdateValidator;