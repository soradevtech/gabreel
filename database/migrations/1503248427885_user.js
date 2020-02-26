'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
/** @type {import('@adonisjs/framework/src/Hash')} */

// This class, and all other migration classes, have an up method and a down method.
// The up method sets up the table with the declared columns and attributes, 
// and the down method simply drops the entire table. One migration class 
// per table apparently.
class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('first_name', 254).nullable()
      table.string('last_name', 254).nullable()
      table.text('profile_img', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
