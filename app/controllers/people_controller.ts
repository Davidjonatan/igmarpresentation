import { HttpContext } from '@adonisjs/core/http'
import Person from '#models/person'
import {
  createPersonValidator,
  updatePersonValidator,
  personIdValidator
} from '#validators/person'

export default class PeopleController {
  async index({ response }: HttpContext) {
    try {
      const people = await Person.all()
      return response.status(200).json({
        message: 'Personas consultadas exitosamente',
        data: people
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error al consultar personas',
        errors: error.message
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await createPersonValidator.validate(data)
      
      const person = await Person.create(payload)
      return response.status(201).json({
        message: 'Persona creada exitosamente',
        data: person
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error al crear persona',
        errors: error.messages 
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      await personIdValidator.validate({ id: params.id })
      
      const person = await Person.findOrFail(params.id)
      return response.status(200).json({
        message: 'Persona consultada exitosamente',
        data: person
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error consultando a la persona',
        errors: error.messages
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      await personIdValidator.validate({ id: params.id })
      
      const data = request.all()
      const payload = await updatePersonValidator.validate(data)
      
      const person = await Person.findOrFail(params.id)
      person.merge(payload)
      await person.save()
      
      return response.status(200).json({
        message: 'Persona modificada con exito',
        data: person
      })
    } catch (error) {
      return response.status(400).json({ 
        message: 'Error al modificar persona',
        error: error.messages  
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await personIdValidator.validate({ id: params.id })
      
      const person = await Person.findOrFail(params.id)
      const deletedPerson = person
      await person.delete()
      
      return response.status(200).json({
        message: 'Persona eliminada exitosamente',
        data: deletedPerson
      })
    } catch (error) {
      return response.status(200).json({
        message: 'Error al eliminar a la persona',
        errors: error.messages
      })
    }
  }
}