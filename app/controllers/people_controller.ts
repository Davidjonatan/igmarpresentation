import { HttpContext } from '@adonisjs/core/http'
import Person from '#models/person'
import {
  createPersonValidator,
  updatePersonValidator,
  personIdValidator
} from '#validators/person'

export default class PeopleController {
  /**
   * Listar todas las personas (GET /people)
   */
  async index({ response }: HttpContext) {
    try {
      const people = await Person.all()
      return response.ok(people)
    } catch (error) {
      return response.internalServerError({
        error: 'Error al obtener las personas'
      })
    }
  }

  /**
   * Crear nueva persona (POST /people)
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await createPersonValidator.validate(data)
      
      const person = await Person.create(payload)
      return response.created(person)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * Mostrar persona específica (GET /people/:id)
   */
  async show({ params, response }: HttpContext) {
    try {
      // Validar ID primero
      await personIdValidator.validate({ id: params.id })
      
      const person = await Person.findOrFail(params.id)
      return response.ok(person)
    } catch (error) {
      if (error.messages) {
        return response.badRequest(error.messages)
      }
      return response.notFound({ error: 'Persona no encontrada' })
    }
  }

  /**
   * Actualizar persona (PUT/PATCH /people/:id)
   */
  async update({ params, request, response }: HttpContext) {
    try {
      // Validar ID
      await personIdValidator.validate({ id: params.id })
      
      const data = request.all()
      const payload = await updatePersonValidator.validate(data)
      
      const person = await Person.findOrFail(params.id)
      person.merge(payload)
      await person.save()
      
      return response.ok(person)
    } catch (error) {
      if (error.messages) {
        return response.badRequest(error.messages)
      }
      return response.notFound({ error: 'Persona no encontrada' })
    }
  }

  /**
   * Eliminar persona (DELETE /people/:id)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      // Validar ID
      await personIdValidator.validate({ id: params.id })
      
      const person = await Person.findOrFail(params.id)
      await person.delete()
      
      return response.ok({ message: 'Persona eliminada correctamente' })
    } catch (error) {
      if (error.messages) {
        return response.badRequest(error.messages)
      }
      return response.notFound({ error: 'Persona no encontrada' })
    }
  }
}