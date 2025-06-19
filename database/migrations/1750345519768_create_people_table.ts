import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'people'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 80).notNullable()
      table.string('lastname', 80).notNullable()
      table.integer('age').unsigned()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 20).nullable()
      
      // SOLUCIÓN: Usar datetime
      table.dateTime('created_at').notNullable()
      table.dateTime('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}