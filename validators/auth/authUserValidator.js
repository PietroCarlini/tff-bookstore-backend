const z = require('zod');

const authUserValidator = z.object({
    firstname: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A name is required' : 'Firstname needs to be a string'
        }
    )
        .max(120, 'Firstname you choose cannot exceed 120 characters').trim(),
    lastname: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A name is required' : 'Lastname needs to be a string'
        }
    )
        .max(120, 'Lastname you choose cannot exceed 120 characters').trim(),
    email: z.email(
        {
            pattern: z.regexes.email,
            error: (issue) => issue.input === undefined ? 'Email is required' : 'Must enter a valid email'

        }).max(320).trim(),
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

module.exports = authUserValidator;