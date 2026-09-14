//? It defines the rules for input data (form, format, required fields).

const z = require('zod');

const authBookshopValidator = z.object({
    name: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A name is required' : 'Name needs to be a string'
        }
    )
        .max(120, 'Name you choose cannot exceed 120 characters').trim(),
    city: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A city is required' : 'City needs to be a string'
        }
    )
        .max(200, 'City you choose cannot exceed 200 characters').trim(),
    address: z.string(
        {
            error: (issue) => issue.input === undefined ? 'An address is required' : 'Address needs to be a string'
        }
    )
        .max(120, 'Address you choose cannot exceed 120 characters').trim(),
    email: z.email(
        {
            pattern: z.regexes.email,
            error: (issue) => issue.input === undefined ? 'Email is required' : 'Must enter a valid email'

        }).max(320).trim(),
    phone: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A phone number is required' : 'Phone needs to be a string'
        }
    )
        .max(120, 'Phone you choose cannot exceed 120 characters').trim(),
    password: z.string(
        {
            error: (issue) => issue.input === undefined ? 'Password is required' : 'Password must contain at least 8 char, 1 number, 1 special char, 1 lower casr and 1 upper case',

        }).max(120).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=.\-_*!]).{8,}$/).trim(),
    confirmPassword: z.string(
        {
            error: (issue) => issue.input === undefined ? 'Please confim you password' : 'Password needs to be a string'
        }).max(120).trim()
}).refine((data) =>
    data.password === data.confirmPassword,
    {
    message: 'Password don\'t match',
    path: ["confirmPassword"]
});

module.exports = authBookshopValidator;