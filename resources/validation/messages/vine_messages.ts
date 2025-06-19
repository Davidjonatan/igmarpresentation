import { messages as defaultMessages } from '@vinejs/vine/defaults'

// 1. Extendemos la interfaz original
interface CustomMessages extends Record<string, string> {
  unique: string;
  phone: string;
  positive: string;
}

// 2. Creamos nuestro objeto con el tipo extendido
const messages: CustomMessages = {
  ...defaultMessages,
  required: 'El campo { field } es obligatorio',
  minLength: 'El campo { field } debe tener al menos { min } caracteres',
  maxLength: 'El campo { field } no puede exceder los { max } caracteres',
  email: 'El formato de email no es válido',
  number: 'El campo { field } debe ser un número',
  min: 'El valor mínimo para { field } es { min }',
  max: 'El valor máximo para { field } es { max }',
  
  // 3. Agregamos nuestras propiedades personalizadas
  unique: 'El valor de { field } ya está en uso',
  positive: 'El campo { field } debe ser un número positivo',
  phone: 'El formato del teléfono no es válido'
};

export { messages };