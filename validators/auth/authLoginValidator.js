const z = require('zod');

const authLoginValidator = z.object(
    {
        email: z.email(
            {
                pattern: z.regexes.email,
                error: (issue) => issue.input === undefined ? 'Email is required' : 'Must enter a valid email'

            }).max(320).trim(),

        password: z.string(
            {
                error: (issue) => issue.input === undefined ? 'Password is required' : 'Invalid data'
            }
        ).max(120).trim()
    });

module.exports = authLoginValidator;