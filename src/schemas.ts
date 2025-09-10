import z from 'zod'

/**
 * Accept only 2-element arrays where: 
 *   (1) element 0 is a string, and 
 *   (2) element 1 is, or can be converted to, a number.
 * 
 * Transform to an object of the desired shape. 
 *   element 0 --> name field 
 *   element 1 --> age field 
 */

export const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                          .transform( tup => ({name: tup[0], age: tup[1]}))
export type Person = z.infer<typeof PersonRowSchema>




