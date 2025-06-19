import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AccessTokensSchema extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('tokenable_id').unsigned().notNullable()
      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable()
      table.text('abilities').notNullable()
      
      // SOLUCIÓN: Usar datetime en lugar de timestamp
      table.dateTime('created_at').notNullable()
      table.dateTime('updated_at').notNullable()
      table.dateTime('last_used_at').nullable()
      table.dateTime('expires_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}