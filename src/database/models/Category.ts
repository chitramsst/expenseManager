//@ts-nocheck
import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Category extends Model {
  static table = 'categories'
  static associations = {
    expenses: { type: 'has_many', foreignKey: 'category_id' },
  }
  @field('title') title
  @field('description') description
  @field('icon_number') icon_number
  @field('default') default
}