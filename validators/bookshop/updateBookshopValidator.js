const z = require('zod');

//?Not necessarily all fields must be updated and sent back => .optional() + .min(1) handles an empty field (unlike authBookshopValidator)

const updateBookshopValidator = z.object({
    name: z.string({}).max(120, 'Name you choose cannot exceed 120 characters').trim().min(1, 'A name is required').optional(),
    city: z.string({}).max(200, 'City you choose cannot exceed 200 characters').trim().min(1, 'A city is required').optional(),
    address: z.string({}).max(120, 'Address you choose cannot exceed 120 characters').trim().min(1, 'An address is required').optional(),
    email: z.email(
        {
            pattern: z.regexes.email,
        }).max(320).trim().min(1, 'An email is required').optional(),
    phone: z.string({}).max(120, 'Phone you choose cannot exceed 120 characters').trim().min(1, 'A phone number is required').optional(),
    // opening hours can be empty: it means "no opening hours"
    openingHours: z.string({}).max(2000, 'Opening hours cannot exceed 2000 characters').trim().optional(),
})

module.exports = updateBookshopValidator;