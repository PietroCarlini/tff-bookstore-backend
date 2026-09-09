const z = require('zod');

//?Not necessarily all fields must be updated and sent back => for this reason .optional() + .min() is used to handle errors in the event of an empty field (unlike authUserValidator)

const updateProfileValidator = z.object({
    firstname: z.string({}).max(120, 'Firstname you choose cannot exceed 120 characters').trim().min(1, 'A firstname is required').optional(),
    lastname: z.string({}).max(120, 'Lastname you choose cannot exceed 120 characters').trim().min(1, 'A lastname is required').optional(),
    email: z.email(
        {
            pattern: z.regexes.email,
        }).max(320).trim().min(1, 'An email is required').optional(),
})

module.exports = updateProfileValidator;  