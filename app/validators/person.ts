import vine from '@vinejs/vine'

// Validador para crear persona
export const createPersonValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    lastname: vine.string().trim().minLength(2).maxLength(100),
    age: vine.number().min(1).max(120),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const person = await db.from('people').where('email', value).first()
        return !person
      }),
    phone: vine.string().trim().maxLength(20).optional()
  })
)

// Validador para actualizar persona
export const updatePersonValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    lastname: vine.string().trim().minLength(2).maxLength(100).optional(),
    age: vine.number().min(1).max(120).optional(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const person = await db
          .from('people')
          .where('email', value)
          .whereNot('id', field.meta?.id || 0) // Usa meta?.id para evitar errores
          .first()
        return !person
      })
      .optional(),
    phone: vine.string().trim().maxLength(20).optional()
  })
)

// Validador para ID de persona
export const personIdValidator = vine.compile(
  vine.object({
    id: vine.number().positive()
  })
)